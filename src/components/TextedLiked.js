import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import DialogModal from './DialogLogin'; // Import the DialogModal component

function TextLiked() {
  const [textLiked, setTextLiked] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open

  useEffect(() => {
    const fetchLikedText = async () => {
      if (isAuthenticated) {
        try {
          const userEmail = user.email;
          const response = await axios.get('https://web-production-dd6e3.up.railway.app/date/text-liked', {
            params: {
              email: userEmail
            }
          });
          console.log(response.data);
          setTextLiked(response.data);
        } catch (error) {
          console.error("Error fetching liked Text:", error);
        }
      }
    };

    fetchLikedText();
  }, [isAuthenticated, user]);


  const deleteLikedText = (textToDelete) => {
    const userEmail = user.email;
  
    axios.delete('https://web-production-dd6e3.up.railway.app/date/text-liked', {
      params: {
        email: userEmail,
        text: textToDelete
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      // If the deletion request is successful, update the state to remove the deleted text locally
      setTextLiked(prevLikedText => prevLikedText.filter(text => text !== textToDelete));
      console.log('Text deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting liked text:', error.message);
      // Handle error
    });
  };
  
  if (!isAuthenticated) {
    setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
    return;
  }
  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          <h1>Text Liked</h1>
          <ul>
            {Array.isArray(textLiked) ? (
              textLiked.map((textliked, index) => (
                <li key={index}>
                  {textliked}
                  <button onClick={() => deleteLikedText(textliked)}>Delete</button>
                </li>
              ))
            ) : (
              <li>{textLiked}</li>
            )}
          </ul>
          {showAuthDialog && (
        <DialogModal
          // setOpenDialog={setShowAuthDialog}
          handleConfirm={() => setShowAuthDialog(false)}
          handleCancel={() => setShowAuthDialog(false)}
        />
      )}
        </div>
      </div>
    </div>
  );
};

export default TextLiked;
