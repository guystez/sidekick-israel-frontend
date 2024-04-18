import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import UploadFile from './UploadFile';
import LoadingButtonsTransition from './Loader';
import ActionAlerts from './Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState('');
  const [responseFromGPT, setResponseFromGPT] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [showUploadAlert, setShowUploadAlert] = useState(false); // State variable to control the visibility of the upload alert
  const [buttonVisible, setButtonVisible] = useState(true); // New state variable to track button visibility
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseFromServer).then(() => {
      alert('Response copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const sendTextLiked = () => {
    if (isAuthenticated) {
        const userEmail = user.email;
        axios.post("http://127.0.0.1:8000/date/text-liked", { email: userEmail, text: responseFromServer })
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


  const handleSendImage = async () => {
    if (!imageFile) {
      console.log("No image file selected, showing upload alert...");

      setShowUploadAlert(true); // Show the upload alert if no image is selected
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 3000);
      return; // Exit function if no image is selected
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', imageFile);

      const makeRequest = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/date/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          setResponseFromServer(JSON.stringify(response.data.final_answer));
          setResponseFromGPT(JSON.stringify(response.data.answer1));
          setResponseReceived(true);
          setLoading(false)
          setButtonVisible(true); // Set the button visible after the response is received
          if (response.status === 200) {
            // Do something with the successful response
          } else {
            console.log('Retrying request...');
            makeRequest();
          }
        } catch (error) {
          console.error('Error sending image to server:', error);
          console.log('Retrying request...');
          makeRequest();
        }
      };

      makeRequest();
    }
  };


  useEffect(() => {
    console.log("Selected image changed:", selectedImage);
    setShowUploadAlert(false); // Hide the upload alert when the component re-renders
  }, [selectedImage]); // Triggered whenever selectedImage changes

  const handleGenerateResponse = () => {
    if (isAuthenticated) {
      const makeRequest = () => {
        axios.post("http://127.0.0.1:8000/date/gemini", { request: responseFromGPT })
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

  const navigateToLogin = () => {
    let timeoutId = setTimeout(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, 10);

    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts before 2 seconds
  };

  useEffect(() => {
    navigateToLogin();
  }, []);

  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          {/* {user && <h2>Welcome!{user.name}</h2>} */}

          {buttonVisible && (
            <LoadingButtonsTransition onClick={handleSendImage} loading={loading} />
          )}
          <UploadFile onChange={handleImageChange} />
          {selectedImage && (
            <div className="border">
              <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
            </div>
          )}
          <ActionAlerts showAlert={showUploadAlert} />


          {(responseFromServer || generatedResponse) && (
            <div className="response-container">
              <div style={{marginTop:'30px'}}>              <button
                onClick={copyToClipboard}
                style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', padding: '4px 4px', fontSize: '10px', lineHeight: '1', backgroundColor: 'lightgray', border: '1px solid darkgray', borderRadius: '5px' }}
              >
                <ContentCopyIcon/>
              </button>
              <button
                onClick={sendTextLiked}
                style={{ 
                  color: 'red',
                  position: 'absolute',
                  top: '5px',
                  left: '5px',
                  cursor: 'pointer',
                  padding: '4px 4px',
                  fontSize: '10px',
                  lineHeight: '1',
                  backgroundColor: 'wheat',
                  border: '1px solid darkgray',
                  borderRadius: '5px',
                 
              }}
                            >
                <FavoriteIcon/>
              </button>
              </div>
              {generatedResponse ? generatedResponse : responseFromServer}

              
            </div>
          )}
          {responseReceived && (
            <button
              onClick={handleGenerateResponse}
              className="generate-button"
            >
              יצירת תגובה
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
