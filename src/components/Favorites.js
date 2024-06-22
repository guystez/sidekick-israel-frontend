
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import DialogModal from './Dialogs/DialogLogin'; // Import the DialogModal component
import { Link } from 'react-router-dom';
import brokenHeart from '../brokenheart.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import HeartSpinner from './SpinnerHeart/HeartSpinner';

function OpenersLiked() {
  const [likedItems, setLikedItems] = useState([]);
  const [isText, setIsText] = useState(true); // State variable to determine if showing liked texts or openers
  const { isAuthenticated, user } = useAuth0();
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open
  const [newItem, setNewItem] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const userEmail = user.email;
          const endpoint = isText ? 'text-liked' : 'openers-liked'; // Determine endpoint based on isText state
          const response = await axios.get(`http://127.0.0.1:8000/date/${endpoint}`, {
            params: {
              email: userEmail
            }
          });
          setLikedItems(response.data);
          setIsPageLoading(false);

        } catch (error) {
          console.error(`Error fetching liked ${isText ? 'texts' : 'openers'}:`, error);
        }
      } else {
        // setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      }
    };

    fetchData();
  }, [isAuthenticated, user, isText]);

  const deleteLikedItem = async (itemToDelete) => {
    try {
      const userEmail = user.email;
      const endpoint = isText ? 'text-liked' : 'openers-liked'; // Determine endpoint based on isText state
      // Send DELETE request to the server to delete the item
      await axios.delete(`http://127.0.0.1:8000/date/${endpoint}`, {
        params: {
          email: userEmail,
          [isText ? 'text' : 'opener']: itemToDelete
        }
      }).then(() => {
        // If the deletion request is successful, update the state to remove the deleted item locally
        setLikedItems(prevLikedItems => prevLikedItems.filter(item => item !== itemToDelete));
      });
    } catch (error) {
      console.error(`Error deleting liked ${isText ? 'text' : 'opener'}:`, error.message);
    }
  };

  const toggleLikedType = () => {
    setIsText(!isText); // Toggle between liked texts and openers
  };

  const handleAddNewItem = async () => {
    if (newItem.trim() !== '') {
      try {
        const userEmail = user.email;
        const endpoint = isText ? 'text-liked' : 'openers-liked'; // Determine endpoint based on isText state
        const response = await axios.post(`http://127.0.0.1:8000/date/${endpoint}`, { opener: newItem, email: userEmail });
        if (response.status === 200) {
          setLikedItems([...likedItems, newItem]);
          setNewItem('');
        } else {
          // Handle non-200 responses here
          console.error('Failed to add item:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding new item:', error);
      }
    }
  };

  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move" style={{ direction: 'rtl' }}>
          {isPageLoading ? (
            <HeartSpinner />
          ) : (
            <>
              <h1>{isText ? 'טקסט שאהבת' : 'משפטי פתיחה'}</h1>
              {showAuthDialog && (
                <DialogModal
                  handleConfirm={() => setShowAuthDialog(false)}
                  handleCancel={() => setShowAuthDialog(false)}
                />
              )}
              <button style={{ marginBottom: '10px', padding: '15px', fontSize: 'large' }} onClick={toggleLikedType}>
                {isText ? 'עבור למשפטי פתיחה שאהבת' : 'עבור לטקסט שאהבת'}
                <HiMiniArrowLongLeft />
              </button>
              <ul>
                {Array.isArray(likedItems) && likedItems.length > 0 ? (
                  likedItems.map((item, index) => (
                    <li key={index} className="liked-item">
                      {item}
                      <button style={{ marginRight: '10px' }} onClick={() => deleteLikedItem(item)}>
                        מחק
                        <DeleteIcon />
                      </button>
                    </li>
                  ))
                ) : (
                  <>
                    <img src={brokenHeart} style={{ boxShadow: 'none' }} alt="brokenHeart" />
                    <br />
                    <div style={{ fontSize: 'larger' }}>
                      {isText ? ' אין לך עדיין טקסט שאהבת' : 'אין לך עדיין משפטי פתיחה'}
                      <button>
                        <Link style={{ fontSize: 'larger' }} to={isText ? "/Main" : "/openers"}>
                          {isText ? ' הוסף כאן  ' : ' הוסף כאן '}
                        </Link>
                      </button>
                    </div>
                  </>
                )}
                {!isText && (
                  <li>
                    <input
                      style={{ marginTop: '30px' }}
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="הוסף משפט חדש משלך"
                    />
                    <button onClick={handleAddNewItem}>הוסף</button>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenersLiked;
