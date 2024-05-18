import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import axios from 'axios'; // Import Axios
import { useAuth0 } from "@auth0/auth0-react";
import SwitchMui from "./SwitchMui";
import { useNavigate } from "react-router-dom";

function FirstTimePage() {
    const [selectedValue, setSelectedValue] = useState('null');
    const { isAuthenticated, user } = useAuth0();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [selectedSide, setSelectedSide] = useState(true);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'a') {
            localStorage.setItem('termsAccepted', true);
            setTermsAccepted(true);
        }
    };

    const handleSwitchChange = (event) => {
        const newValue = event.target.checked;
        setSelectedSide(newValue);
        console.log("Switch value:", newValue ? 'ימין' : 'שמאל');
    };

    const sendToServer = () => {
        if (!isAuthenticated) {
            console.error("User not authenticated");
            return;
        }

        const userEmail = user.email; // Access the user's email from the user object
        console.log(user);
        axios.post('https://web-production-dd6e3.up.railway.app/date/check-hebrew', { termsAccepted, selectedSide, email: userEmail })
            .then(response => {
                console.log(response.data, 'success');
                navigate("/Main");
                // Handle successful response if needed
            })
            .catch(error => {
                console.error(error.response.data, 'not success');
                // Handle error if needed
            });
    };

    return (
        
        <div className="custom-home-page">
            <div className="hero">
                <div className="cool-move">
                    <h1>Welcome😍</h1>

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
                    <SwitchMui handleSwitchChange={handleSwitchChange}></SwitchMui>

                    {termsAccepted && (
                        <>
                        <div>
                            
                        </div>
                        <div className="btn-login">
                            <button
                                className='log-button button0 button2'
                                onClick={() => {
                                    sendToServer();
                                }}
                            >
                                Send
                            </button>

                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FirstTimePage;
