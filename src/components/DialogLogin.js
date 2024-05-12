import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';

export default function DialogModal({ handleConfirm, handleCancel }) {
  const [open, setOpen] = useState(true); // Initialize open state
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('null');


  const handleLogin = () => {
    loginWithRedirect({
      returnTo: 'http://localhost:3000/Main', // Specify the desired return URL
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
    navigate("/"); // Navigate to the home page
    handleCancel(); // Call the handleCancel function passed as a prop
  };

  const handleOpen = () => {
    setOpen(true); // Set open state to true
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>


          <DialogContentText>
            <div className="sub-login">
              <div className="btn-login">
                <button
                  className='log-button button0 button2'
                  onClick={handleLogin}>Log In
                </button>
              </div>
              <div className="btn-signup">
                <button
                  className='log-button button0 button2'
                  onClick={handleLogin}>
                  Signup
                </button>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleConfirm}>Terms</Button> */}
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
