import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import axios from 'axios'; // Import Axios
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import ChatSelector from "./ChatSelector";

function FirstTimePage() {
    const [selectedValue, setSelectedValue] = useState('null');
    const { isAuthenticated, user } = useAuth0();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [selectedSide, setSelectedSide] = useState('left'); // Manage selectedSide here

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'a') {
            localStorage.setItem('termsAccepted', true);
            setTermsAccepted(true);
        }
    };

    const handleChatSelection = (side) => {
        setSelectedSide(side);
        console.log(`Selected side from ChatSelector: ${side}`);
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
                <div className="cool-move" >
                    <h1> 😍ברוכים הבאים</h1>


                    {/* <SwitchMui handleSwitchChange={handleSwitchChange}></SwitchMui> */}
                    אנא בחר את הצד שבו ההודעות שלך בדרך כלל מופיעות, לחץ על ההודעות בצד המתאים בתמונה:
          <ChatSelector selectedSide={selectedSide} onSelectSide={handleChatSelection} />
                    <div style={{direction:'rtl'}}>
                        <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleChange}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        אנא אשר את  <a href='/terms' target='_blank'>התנאים.</a>
                    </div>
                    {termsAccepted && (
                        <>
                            <div>

                            </div>
                            <div className="btn-login">
                                <button
                                    style={{ padding: '10px 20px' }}
                                    onClick={() => {
                                        sendToServer();
                                    }}
                                >
                                    שלח
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
