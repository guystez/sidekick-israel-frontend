import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import DialogModal from './DialogLogin'; // Import the DialogModal component
import { Link } from 'react-router-dom';
import brokenHeart from '../brokenheart.png';

function OpenersLiked() {
  const [likedOpeners, setLikedOpeners] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open

  useEffect(() => {
    const fetchLikedOpeners = async () => {
      if (isAuthenticated) {
        try {
          const userEmail = user.email;
          const response = await axios.get('https://web-production-dd6e3.up.railway.app/date/openers-liked', {
            params: {
              email: userEmail
            }
          });
          setLikedOpeners(response.data);
        } catch (error) {
          console.error("Error fetching liked openers:", error);
        }
      } else {
        setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      }
    };

    fetchLikedOpeners();
  }, [isAuthenticated, user]);

  const deleteLikedOpener = async (openerToDelete) => {
    try {
      const userEmail = user.email;
      // Send DELETE request to the server to delete the opener
      await axios.delete('https://web-production-dd6e3.up.railway.app/date/openers-liked', {
        params: {
          email: userEmail,
          opener: openerToDelete
        }
      }).then(() => {
        // If the deletion request is successful, update the state to remove the deleted opener locally
        setLikedOpeners(prevLikedOpeners => prevLikedOpeners.filter(opener => opener !== openerToDelete));
      });
    } catch (error) {
      console.error('Error deleting liked opener:', error.message);
    }
  };

  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          <h1>Openers Liked</h1>
          {showAuthDialog && (
            <DialogModal
              handleConfirm={() => setShowAuthDialog(false)}
              handleCancel={() => setShowAuthDialog(false)}
            />
          )}
          <ul>
            {Array.isArray(likedOpeners) && likedOpeners.length > 0 ? (
              likedOpeners.map((opener, index) => (
                <li key={index}>
                  {opener}
                  <button onClick={() => deleteLikedOpener(opener)}>Delete</button>
                </li>
              ))
            ) : (
              <>
                  <img src={brokenHeart} style={{boxShadow:'none'}} alt="brokenHeart" />
                <br></br>
                <div>
                No openers liked. Please <Link to="/openers">add</Link> an opener.</div>
              
               </>
              
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OpenersLiked;
