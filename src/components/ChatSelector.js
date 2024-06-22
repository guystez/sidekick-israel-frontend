import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TouchIcon from "./touch2.png";
import "./Firsttime.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatSelector = ({
  selectedImage,
  onSend,
  onChangeImage,
  onLanguageCheck,
  onLanguageSelection,
}) => {
  const { user } = useAuth0();
  const [selectedSide, setSelectedSide] = useState(null);
  const [autoSide, setAutoSide] = useState("left");
  const [open, setOpen] = useState(true);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const side = e.clientX < rect.left + rect.width / 2 ? "left" : "right";
      setSelectedSide(side);
      clearInterval(intervalRef.current); // Stop the automatic switching
    }
  };

  const handlesave = () => {
    axios
      .post("http://127.0.0.1:8000/date/check-hebrew", {
        termsAccepted: true,
        selectedSide,
        email: user.email,
      })
      .then((response) => {
        setOpen(false);
        onSend();
        onLanguageCheck(false);
        onLanguageSelection(selectedSide);
      })
      .catch((error) => {
        console.error("Error sending side:", error);
      });
  };

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && selectedImage) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
    } else {
      setTimeout(drawImageOnCanvas, 100); // Retry drawing the image after a short delay
    }
  };

  useEffect(() => {
    if (selectedImage && selectedSide === null) {
      intervalRef.current = setInterval(() => {
        setAutoSide((prevSide) => (prevSide === "left" ? "right" : "left"));
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [selectedImage, selectedSide]);

  useEffect(() => {
    drawImageOnCanvas();
  }, [selectedImage]);

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            style={{ fontSize: "x-large" }}
            variant="h6"
            component="div"
          >
            <b onClick={handlesave}>שמור</b>
          </Typography>

          <Button color="inherit" onClick={onChangeImage}>
            <b style={{ fontSize: "x-large" }}>שינוי תמונה</b>
          </Button>
        </Toolbar>
      </AppBar>
      <b style={{ direction: "rtl", marginBottom: "20px" }}>
        <h1 style={{ fontFamily: "system-ui" }}> חשוב: לפני שמתחילים!! </h1>
        באיזה צד בשיחה נמצאות ההודעות שלך ? ימין או שמאל? אנא לחץ על התמונה בצד
        המתאים. ולאחר מכן לחץ על ״שמור״.
      </b>
      <div
        style={{ padding: "20px", textAlign: "center", position: "relative" }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{ cursor: "pointer", maxWidth: "100%", height: "auto" }}
        />
        {selectedSide === null && (
          <>
            <div
              className={`overlay ${
                autoSide === "left" ? "right-blurred" : "left-blurred"
              }`}
            ></div>
            <div
              className={`overlay ${
                autoSide === "left" ? "left-selected" : "right-selected"
              }`}
            ></div>
            <div
              className={`touch-container ${
                autoSide === "left" ? "touch-left" : "touch-right"
              }`}
            >
              <img src={TouchIcon} alt="Touch Icon" className="touch-icon" />
              <span className="touch-label">זה אני</span>
            </div>
          </>
        )}
        {selectedSide !== null && (
          <>
            <div
              className={`overlay ${
                selectedSide === "left" ? "right-blurred" : "left-blurred"
              }`}
            ></div>
            <div
              className={`overlay ${
                selectedSide === "left" ? "left-selected" : "right-selected"
              }`}
            ></div>
            <div
              className={`touch-container ${
                selectedSide === "left" ? "touch-left" : "touch-right"
              }`}
            >
              <img src={TouchIcon} alt="Touch Icon" className="touch-icon" />
              <span className="touch-label">זה אני</span>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default ChatSelector;
