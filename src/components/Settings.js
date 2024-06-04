import React, { useState } from "react";
import SwitchMui from './SwitchMui'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios

function Settings() {
    const [selectedSide, setSelectedSide] = useState(true);
    const { isAuthenticated, user } = useAuth0();
    const [termsAccepted, setTermsAccepted] = useState(true);

    const navigate = useNavigate();



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

        axios.post('https://web-production-dd6e3.up.railway.app/date/check-hebrew', { termsAccepted:true, selectedSide, email: userEmail })
            .then(response => {
                console.log(response.data, 'success');
                navigate("/");
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
                   {/* <h1>Settings</h1>  */}
                   <SwitchMui handleSwitchChange={handleSwitchChange}></SwitchMui>

                   {termsAccepted && (
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings