import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Radio from '@mui/material/Radio';

export default function DialogModal() {
  const [open, setOpen] = React.useState(true);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate(); // Initialize the navigate function
  const [selectedValue, setSelectedValue] = React.useState('null');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (selectedValue ) {
      // If yes, set a flag in the local storage indicating acceptance of terms
      localStorage.setItem('termsAccepted', true);
      const chekc=localStorage.getItem('termsAccepted', true);
      console.log(chekc,'@@@');
    }
    };
  const handleClose = () => {
    setOpen(false);
    // setOpenDialog(false); // Close the dialog
    // handleCancel(); // Call the cancel handler (optional)
    navigate("/"); // Navigate to the home page

  };

  const handleConfirm = () => {
    window.open('/terms', '_blank');
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>
        <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      Please read and accept the <a href='/terms' target='_blank'>terms.</a>
            </div>
          <DialogContentText>
            <div className="sub-login">
              <div className="btn-login">
                <button
                  className='log-button button0 button2'
                  onClick={() => {
                    loginWithRedirect();
                  }}
                >
                  Login
                </button>
              </div>
              <div className="btn-signup">
                <button
                  className='log-button button0 button2'
                  onClick={() => {
                    loginWithRedirect();
                  }}
                >
                  Signup
                </button>
              </div>
       
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>terms</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
