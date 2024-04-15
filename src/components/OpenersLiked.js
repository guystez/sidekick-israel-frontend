import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

function OpenersLiked() {
  const [likedOpeners, setLikedOpeners] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  useEffect(() => {
    const fetchLikedOpeners = async () => {
      if (isAuthenticated) {
        try {
          const userEmail = user.email;
          const response = await axios.get('http://127.0.0.1:8000/date-openers-liked', {
            params: {
              email: userEmail
            }
          });
          console.log(response.data);
          setLikedOpeners(response.data);
        } catch (error) {
          console.error("Error fetching liked openers:", error);
        }
      }
    };

    fetchLikedOpeners();
  }, [isAuthenticated, user]);

  return (
    
    <div className="custom-home-page">
    <div className="hero">
      <div className="circle"></div>
      <div className="cool-move">
        <div className="title-logo-container">
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
         
          <h1>sidekick.AI</h1>
        </div>
      <h1>Openers Liked</h1>
      <ul>
        {Array.isArray(likedOpeners) ? (
          likedOpeners.map((opener, index) => (
            <li key={index}>{opener}</li>
          ))
        ) : (
          <li>{likedOpeners}</li>
        )}
      </ul>
      </div>
      </div>
      </div>
  );}

export default OpenersLiked;
