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

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState('');
  const [responseFromGPT, setResponseFromGPT] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);
  const { isAuthenticated, user ,isLoading} = useAuth0();
  const [loading, setLoading] = useState(false);
  const [showUploadAlert, setShowUploadAlert] = useState(false); // State variable to control the visibility of the upload alert
  const [buttonVisible, setButtonVisible] = useState(true); // New state variable to track button visibility
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open
  const [sliderValue, setSliderValue] = useState(50); // State to store slider value


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
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
          console.log("Email sent successfully:", response.data);
          alert("Text Liked!"); // Show alert when text is liked
        })
        .catch(error => {
          console.error("Error sending email:", error);
          alert("Error sending email!"); // Show alert if there's an error
        });
    } else {
      console.error("User is not authenticated");
      alert("User is not authenticated!"); // Show alert if user is not authenticated
    }
  };


  const makeRequest = async (formData) => {
    try {
      const response = await axios.post('https://web-production-dd6e3.up.railway.app/date/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setResponseFromServer((response.data.final_answer));
        setResponseFromGPT(JSON.stringify(response.data.answer1));
        setResponseReceived(true);
        setLoading(false);
        setButtonVisible(true); // Set the button visible after the response is received
      } else {
        console.log('Retrying request...');
        makeRequest(formData);
      }
    } catch (error) {
      console.error('Error sending image to server:', error);
      if (error.response && error.response.status === 404) {
        // Handle the case when no requests are left
        alert('No requests left');
      } else {
        // Handle other errors
        console.log('Retrying request...');
        makeRequest(formData);
      }
    }
  };

  const handleSendImage = async () => {
    if (!isAuthenticated) {
      console.log('not Authenticated');
      setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      return;
    }
    if (!imageFile) {
      console.log("No image file selected, showing upload alert...");
      setShowUploadAlert(true); // Show the upload alert if no image is selected
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 3000);
      return; // Exit function if no image is selected
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('email', user.email); // Append the user's email to the form data

      makeRequest(formData);
    }
  }

  useEffect(() => {
    console.log("Selected image changed:", selectedImage);
    setShowUploadAlert(false); // Hide the upload alert when the component re-renders
  }, [selectedImage]); // Triggered whenever selectedImage changes

  const handleGenerateResponse = () => {
    if (isAuthenticated) {
      const makeRequest = () => {
        axios.post("https://web-production-dd6e3.up.railway.app/date/gemini", { request: responseFromGPT ,mode:{sliderValue}})
          .then(response => {
            setGeneratedResponse(response.data);
            if (response.status === 200) {
              // Do something with the successful response
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


  const handleSliderChange = (value) => {
    setSliderValue(value); // Update slider value state
  };

  console.log('responseFromServer:',responseFromServer);

  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          {buttonVisible && (
            <LoadingButtonsTransition
              onClick={handleSendImage}
              loading={loading}
            />
          )}
          <UploadFile onChange={handleImageChange} />
          {selectedImage && (
            <div className="border">
              <img
                src={selectedImage}
                alt="Uploaded"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          )}
          <ActionAlerts showAlert={showUploadAlert} />
          {(responseFromServer || generatedResponse) && (
            <div className="response-container">
              <div style={{ marginTop: "30px" }}>
                <button
                  onClick={copyToClipboard}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    cursor: "pointer",
                    padding: "4px 4px",
                    fontSize: "10px",
                    lineHeight: "1",
                    backgroundColor: "lightgray",
                    border: "1px solid darkgray",
                    borderRadius: "5px",
                  }}
                >
                  <ContentCopyIcon />
                </button>
                <button
                  onClick={sendTextLiked}
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                    cursor: "pointer",
                    padding: "4px 4px",
                    fontSize: "10px",
                    lineHeight: "1",
                    backgroundColor: "wheat",
                    border: "1px solid darkgray",
                    borderRadius: "5px",
                  }}
                >
                  <FavoriteIcon />
                </button>
              </div>
              {generatedResponse || responseFromServer}{" "}
              {/* Display generatedResponse if available, otherwise display responseFromServer */}
            </div>
          )}

          {responseReceived && (
            <div>
              <DiscreteSliderValues onChange={handleSliderChange} />
              <button
                onClick={handleGenerateResponse}
                className="generate-button"
              >
                יצירת תגובה
              </button>
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
