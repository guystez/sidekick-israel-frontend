import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function DialogModal({ handleConfirm, handleCancel }) {
  const [open, setOpen] = useState(true); // Initialize open state
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('null');


  const handleLogin = () => {
    loginWithRedirect({
      returnTo: window.location.origin, // Specify the desired return URL
      // Add a callback to handle the login redirect
      onRedirectCallback: (appState) => {
      localStorage.setItem('isLoggedIn', 'true');
        
      }
    });
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (selectedValue) {
      localStorage.setItem('termsAccepted', true);
      const check = localStorage.getItem('termsAccepted');

    }
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    // navigate("/"); // Navigate to the home page
    handleCancel(); // Call the handleCancel function passed as a prop
  };

  const handleOpen = () => {
    setOpen(true); // Set open state to true
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign:'center'}}>ברוך הבא</DialogTitle>
        <DialogContent>


          <DialogContentText style={{padding:'25px'}}>
            <div className="sub-login">
              <div className="btn-login">
                <button
                  className='log-button button0 button2'
                  onClick={handleLogin}>התחבר
                </button>
              </div>
              <div className="btn-signup">
                <button
                  className='log-button button0 button2'
                  onClick={handleLogin}>
                  הירשם
                </button>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleConfirm}>Terms</Button> */}
          <Button onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
