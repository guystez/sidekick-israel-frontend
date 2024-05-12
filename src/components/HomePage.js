import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import UploadFile from './UploadFile';
import LoadingButtonsTransition from './Loader';
import ActionAlerts from './Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogModal from './DialogLogin'; // Import the DialogModal component
import DiscreteSliderValues from './Slider';
import Profile from './Auth0/Profile';
import { useNavigate } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import PopUpDialog from './PopUpDialog';

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState('');
  const [responseFromGPT, setResponseFromGPT] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [showUploadAlert, setShowUploadAlert] = useState(false); // State variable to control the visibility of the upload alert
  const [buttonVisible, setButtonVisible] = useState(true); // New state variable to track button visibility
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open
  const [sliderValue, setSliderValue] = useState(50); // State to store slider value
  const [requestLeft, setRequestLeft] = useState('')
  const [isEnglishPhone, setIsEnglishPhone] = useState(false); // State variable to track phone language preference
  const [userAnswer, setUserAnswer] = useState(null); // State variable to track user's answer
  const [termsAccepted, setTermsAccepted] = useState(false); // State variable to track whether the terms have been accepted
  const navigate = useNavigate();
  const [mockLike, setMockLike] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State variable to control popup dialog visibility

  const handleImageChange = (e) => {
    if (!isAuthenticated) {
      console.log('User is not authenticated. Opening auth dialog...');
      setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      return;
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      setButtonVisible(true); // Set the button visible after the response is received
      setResponseReceived(false);

    }
  };

  const copyToClipboard = () => {
    const textToCopy = generatedResponse || responseFromServer; // Use generatedResponse first, then fallback to responseFromServer
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Response copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const sendTextLiked = () => {
    const textToLike = generatedResponse || responseFromServer; // Use generatedResponse first, then fallback to responseFromServer
    if (isAuthenticated) {
      const userEmail = user.email;
      axios.post("https://web-production-dd6e3.up.railway.app/date/text-liked", { email: userEmail, text: textToLike })
        .then(response => {
          if (response.status === 200) {
            console.log("Email sent successfully:", response.data);
            alert("Text Liked!"); // Show alert when text is liked
          } else {
            if (response.status === 409) {
              console.log("Text already liked by the user:", response.data);
              alert("Text already liked by the user!"); // Show alert if text is already liked by the user
            } else {
              console.log("Unexpected response status:", response.status);
              alert("Unexpected response status: " + response.status); // Show alert for unexpected response status
            }
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 303) {
            console.error("Request failed with status code 303");
            alert("You already like that"); // Show alert for error with status code 303
          } else {
            console.error("Error sending email:", error);
            alert("Error sending email!"); // Show alert if there's an error
          }
        });
    } else {
      console.error("User is not authenticated");
      alert("User is not authenticated!"); // Show alert if user is not authenticated
    }
  };
  


  //Send the main request
  const makeRequest = async (formData) => {

    try {
      const response = await axios.post('https://web-production-dd6e3.up.railway.app/date/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setGeneratedResponse('')
      if (response.status === 200) {
        setResponseFromServer((response.data.final_answer));
        setRequestLeft(response.data.request_left)
        setResponseFromGPT(JSON.stringify(response.data.answer1));
        setResponseReceived(true);
        setLoading(false);
        setButtonVisible(false); // Set the button visible after the response is received
      } else {
        console.log('Retrying request...');
        makeRequest(formData);
      }
    } catch (error) {
      console.error('Error sending image to server:', error);
      if (error.response && error.response.status === 404 && error.response.data.error === 'No requests left') {
        // Handle the case when no requests are left
        alert('No requests left');
        setLoading(false);

      } else if (error.response && error.response.status === 404 && error.response.data.error === 'Upload screenshot without KeyBoard') {
        // Handle the case when specific characters are detected
        alert('Remove the keyboard from the image');
        setLoading(false);

      } else {
        // Handle other errors
        console.log('Retrying request...');
        makeRequest(formData);

      }
    }
  };




  const handleSendImage = async () => {
    if (!isAuthenticated) {
      console.log('User is not authenticated. Opening auth dialog...');
      setShowAuthDialog(true); // Always open the auth dialog if user is not authenticated
      return;
    }
    if (!imageFile) {
      console.log("No image file selected, showing upload alert...");
      setShowUploadAlert(true);
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 3000);
      return;
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('email', user.email);

      makeRequest(formData);
    }
  };

  useEffect(() => {
    console.log("Selected image changed:", selectedImage);
    setShowUploadAlert(false); // Hide the upload alert when the component re-renders
  }, [selectedImage]); // Triggered whenever selectedImage changes

  const handleGenerateResponse = () => {
    if (isAuthenticated) {
      setLoading(true);
      const makeRequest = () => {
        axios.post("https://web-production-dd6e3.up.railway.app/date/gemini", { request: responseFromGPT, mode: { sliderValue } })
          .then(response => {

            setGeneratedResponse(response.data);
            if (response.status === 200) {
              setLoading(false);
              setMockLike(false);


            } else {
              console.log("Retrying request...");
              makeRequest();
            }
          })
          .catch(error => {
            console.error("Error sending:", error);
            console.log("Retrying request...");
            makeRequest();
          });
      };

      makeRequest();
    } else {
      console.error("User is not authenticated");
    }
  };


  // Inside the useEffect hook where userAnswer is set
  useEffect(() => {
    const checkUserAnswer = async () => {
      if (isAuthenticated && user) { // Check if user is authenticated and user object is not undefined
        try {
          const response = await axios.get('https://web-production-dd6e3.up.railway.app/date/check-hebrew', {
            params: {
              email: user.email, // Access user.email only if user is not undefined
            },
          });
          console.log(response.data);
          setRequestLeft(response.data.request_left)
          if (response.data.is_hebrew !== null) {
            // If user has answered the question and accepted the terms, update state and hide the button
            setIsEnglishPhone(response.data.is_hebrew);
            setUserAnswer(true);
            setTermsAccepted(true);
          } else {
            // If the response is None, redirect to FirstTimePage component without using history
            navigate('/FirstTimePage'); // Use navigate to navigate
          }
          if (response.data.check_gifts==false){
            
            setShowPopup(true);          }
        } catch (error) {
          if (error.response && error.response.status === 404 && error.response.data.error === 'User does not mark the question') {
            // Handle the case where the server returns a 404 error with the specified message

            console.error('User does not mark the question');
            // Optionally, display an alert or take other actions to notify the user
          } else {
            console.error('Error checking user answer:', error);
            navigate('/FirstTimePage');

          }
        }
      }
    };

    checkUserAnswer();
  }, [isAuthenticated, user]); // Include isAuthenticated and user in the dependency array



  useEffect(() => {
    if (responseFromServer || generatedResponse) {
      const heroElement = document.querySelector('.hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [responseFromServer, generatedResponse]);

  useEffect(() => {
    // Check if user object is available and not loading
    if (user && !isLoading) {
      console.log("User:"); // Log the user object
    }
  }, [user, isLoading]);



  useEffect(() => {
    // Reset the dialog state to closed when the user logs in
    if (isAuthenticated) {
      setShowAuthDialog(false);
    }
  }, [isAuthenticated]);


  const handleSliderChange = (value) => {
    setSliderValue(value); // Update slider value state
  };

  console.log('responseFromServer:', responseFromServer, 'Request left : ', requestLeft);

  return (

    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          {(!isAuthenticated || !termsAccepted) && (
            <div className="journey-message">
              <button onClick={() => setShowAuthDialog(true)}>Let's start our journey.</button>
            </div>
          )}

          {isAuthenticated && termsAccepted && (
            <>
              <Profile />
              <p>You have more {requestLeft} request left</p>

              <div>
      {/* Your component JSX */}
      {showPopup && <PopUpDialog  handleCancel={() => setShowAuthDialog(false)}/>} {/* Render the popup dialog if showPopup is true */}
    </div>
              {buttonVisible && (
                <LoadingButtonsTransition
                  onClick={handleSendImage}
                  loading={loading}
                  buttonLabel='שלח'
                />
              )}
            </>
          )}

          {isAuthenticated && termsAccepted && (
            <>
              <UploadFile onChange={handleImageChange} />
              {selectedImage && (
                <div className="border">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    style={{ maxWidth: "300px", maxHeight: "450px", cursor: "pointer" }}
                  />
                </div>
              )}
            </>
          )}

          <ActionAlerts showAlert={showUploadAlert} />
          {(generatedResponse || responseFromServer) && (
            
            <div className="response-container">
              
              <div style={{ marginTop: "30px" }}>
                <button className='copy-button'
                  onClick={copyToClipboard}
                >
                  <ContentCopyIcon />
                </button>
                </div>

               
                  <div onClick={sendTextLiked}>
                  <LikeButton  isLiked={mockLike} handleLike={() => setMockLike(!mockLike)} />
                  </div>


              {generatedResponse || responseFromServer}{" "}
              {/* Display generatedResponse if available, otherwise display responseFromServer */}
              </div>
            
          )}

          {responseReceived && (
            <div>
              
              <DiscreteSliderValues onChange={handleSliderChange} />
              <LoadingButtonsTransition
                onClick={handleGenerateResponse}
                // className="generate-button"
                loading={loading}
                buttonLabel='תגובה חדשה' // Pass button label as prop

              />
              

            </div>
            
          )}
          {showAuthDialog && (
            <DialogModal
              handleConfirm={() => setShowAuthDialog(false)}
              handleCancel={() => setShowAuthDialog(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

