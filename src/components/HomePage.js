import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Login from './Auth0/Login';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState('');
  const [responseFromGPT, setResponseFromGPT] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated,user } = useAuth0();

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
      console.log("User email:", userEmail);
      axios.post("https://web-production-dd6e3.up.railway.app/date/text-liked", { email: userEmail ,text:responseFromServer})
        .then(response => {
          console.log("Email sent successfully:", response.data);
        })
        .catch(error => {
          console.error("Error sending email:", error);
        });
    } else {
      console.error("User is not authenticated");
    }
  };

  const handleSendImage = async () => {
    if (imageFile) {
      console.log('Preparing to send image...');
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const makeRequest = async () => {
        try {
          console.log('Sending image to the server...');
          const response = await axios.post('https://web-production-dd6e3.up.railway.app/date/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('Image sent to the server.');
          console.log(response.data.final_answer);
          setResponseFromServer(JSON.stringify(response.data.final_answer));
          setResponseFromGPT(JSON.stringify(response.data.answer1));
  
          // Check if response status is 200
          if (response.status === 200) {
            // Do something with the successful response
          } else {
            // Retry the request if status is not 200
            console.log('Retrying request...');
            makeRequest(); // Recursive call to make the request again
          }
        } catch (error) {
          console.error('Error sending image to server:', error);
          // Retry the request if an error occurs
          console.log('Retrying request...');
          makeRequest(); // Recursive call to make the request again
        }
      };
  
      makeRequest(); // Initial call to make the request
    }
  };
  

  const handleGenerateResponse = () => {
    if (isAuthenticated) {
      const userEmail = user.email;
      console.log("responseFromGPT:", responseFromGPT);
      
      const makeRequest = () => {
        axios.post("https://web-production-dd6e3.up.railway.app/date/gemini", { request: responseFromGPT })
          .then(response => {
            console.log("Text sent successfully:", response.data);
            setGeneratedResponse(response.data); // Store generated response in state
            // Check if response status is 200
            if (response.status === 200) {
              // Do something with the successful response
            } else {
              // Retry the request if status is not 200
              console.log("Retrying request...");
              makeRequest(); // Recursive call to make the request again
            }
          })
          .catch(error => {
            console.error("Error sending:", error);
            // Retry the request if an error occurs
            console.log("Retrying request...");
            makeRequest(); // Recursive call to make the request again
          });
      };
  
      makeRequest(); // Initial call to make the request
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
  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          <div className="title-logo-container">
            
           
            <h1>sidekick.AI</h1>
          </div>
          <div ><Login/> </div>
          <p>העלה תצלום מסך!</p>
          <button onClick={handleSendImage}>שלח</button>

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <div className="border">
              <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
            </div>
          )}
         
          {responseFromServer && (
            <div className="response-container">
              {responseFromServer}
              <button 
                onClick={copyToClipboard} 
                style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', padding: '4px 4px', fontSize: '10px', lineHeight: '1', backgroundColor: 'lightgray', border: '1px solid darkgray', borderRadius: '5px' }}
              >
                העתק
              </button>
              <button 
                onClick={sendTextLiked} 
                style={{ position: 'absolute', top: '5px', left: '5px', cursor: 'pointer', padding: '4px 4px', fontSize: '10px', lineHeight: '1', backgroundColor: 'lightgray', border: '1px solid darkgray', borderRadius: '5px' }}
              >  
                אהבתי
              </button>
            </div>
          )}
           {responseFromGPT && (
            <button onClick={handleGenerateResponse} className="generate-button">Generate Response</button>
          )}
          {generatedResponse && (
  <div className="response-container">
    {generatedResponse}
    <button 
      onClick={copyToClipboard} 
      style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', padding: '4px 4px', fontSize: '10px', lineHeight: '1', backgroundColor: 'lightgray', border: '1px solid darkgray', borderRadius: '5px' }}
    >
      העתק
    </button>
    <button 
      onClick={sendTextLiked} 
      style={{ position: 'absolute', top: '5px', left: '5px', cursor: 'pointer', padding: '4px 4px', fontSize: '10px', lineHeight: '1', backgroundColor: 'lightgray', border: '1px solid darkgray', borderRadius: '5px' }}
    >  
      אהבתי
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
