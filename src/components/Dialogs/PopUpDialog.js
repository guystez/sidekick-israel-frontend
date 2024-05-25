import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PresentImage from '../../Present.png';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function PopUpDialog({ handleConfirm, handleCancel }) {
    const [open, setOpen] = useState(true); // Initialize open state
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('null');
    const { isAuthenticated, user } = useAuth0();


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (selectedValue) {
            localStorage.setItem('termsAccepted', true);
            const check = localStorage.getItem('termsAccepted');

        }
    };

    const handleClose = () => {
        axios.post('https://web-production-dd6e3.up.railway.app/date/remove-gift', {
             email: user.email
        })
        .then(response => {
            console.log(response.data); // Print the response data to the console
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors if any
        });
    

        setOpen(false); // Close the dialog
        navigate("/Main"); // Navigate to the home page
        handleCancel(); // Call the handleCancel function passed as a prop
    };



    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ברוך הבא!</DialogTitle>
                <DialogContent>

                    

                    
                    <DialogContentText>
                    <h1>קיבלת 5 ניסיונות מתנה מאיתנו</h1>
                    <img src={PresentImage} style={{width:'60%',marginLeft:"20%"}} alt="Gift" />
                        <div className="sub-login">
                            <div className="btn-signup">
                                <button onClick={handleClose} className='log-button button0 button2'>

                                    קבל
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
