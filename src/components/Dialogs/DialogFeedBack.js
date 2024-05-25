import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function DialogFeedBack({ handleConfirm, handleCancel }) {
    const [open, setOpen] = useState(false); // Initialize open state to false
    const [selectedEmoji, setSelectedEmoji] = useState(""); // Initialize selected emoji state
    const [feedbackText, setFeedbackText] = useState(""); // Initialize feedback text state
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true); // After 2 minutes, set open state to true
        }, 600000); // 10 minutes in milliseconds

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []); // Run this effect only once on component mount

    const handleEmojiClick = async (feedback) => {
        try {
            // Send feedback description and email to Django website using Axios
            await axios.post('https://web-production-dd6e3.up.railway.app/date/user-feedback', { feedback, email: user.email }); // Assuming you're using Auth0 and user.email contains the email address
            console.log('Feedback description and email sent successfully:', feedback);
            setSelectedEmoji(feedback); // Set selected emoji
            // setOpen(false); // Close the dialog
            // handleCancel(); // Call the handleCancel function passed as a prop
        } catch (error) {
            console.error('Error sending feedback description and email:', error);
        }
    };

    const handleFeedbackChange = (event) => {
        setFeedbackText(event.target.value);
    };

    const handleSendEmail = async () => {
        if (feedbackText.trim() !== "") {
            try {
                // Send request to Django backend to send email
                await axios.post('https://web-production-dd6e3.up.railway.app/date/email-feedback', {
                    feedback: feedbackText,
                    email: user.email 
                });
                console.log("Email sent successfully.");
            } catch (error) {
                console.error("Error sending email:", error);
            }
        } else {
            // Feedback text is empty, do nothing
            console.log("No feedback text provided. Skipping email sending.");
        }
        setOpen(false); // Close the dialog
        navigate("/Main"); // Navigate to the home page
        handleCancel(); // Call the handleCancel function passed as a prop
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
        navigate("/Main"); // Navigate to the home page
        handleCancel(); // Call the handleCancel function passed as a prop
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} style={{ direction: "rtl" }}>
                <DialogTitle>FeedBack</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        דרגו אותנו
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ fontSize: '4rem', cursor: 'pointer', borderBottom: selectedEmoji === "ok" ? "3px solid blue" : "none" }} onClick={() => handleEmojiClick("ok")}>🤔</div>
                            <div style={{ fontSize: '4rem', cursor: 'pointer', borderBottom: selectedEmoji === "good" ? "3px solid blue" : "none" }} onClick={() => handleEmojiClick("good")}>😄</div>
                            <div style={{ fontSize: '4rem', cursor: 'pointer', borderBottom: selectedEmoji === "amazing" ? "3px solid blue" : "none" }} onClick={() => handleEmojiClick("amazing")}>😍</div>
                        </div>
                    </DialogContentText>
                    כיצד נוכל להשתפר?
                    <input type="text" placeholder={"הקלד תגובה..."} onChange={handleFeedbackChange}></input>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSendEmail}>שלח</Button>
                    <Button onClick={handleClose}>סגור</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
