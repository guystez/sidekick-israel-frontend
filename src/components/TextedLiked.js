import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

function TextLiked() {
  const [textLiked, setTextLiked] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchLikedText = async () => {
      if (isAuthenticated) {
        try {
          const userEmail = user.email;
          const response = await axios.get('https://web-production-dd6e3.up.railway.app/date-text-liked', {
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

  return (
    
    <div className="custom-home-page">
    <div className="hero">
      <div className="circle"></div>
      <div className="cool-move">
        <div className="title-logo-container">
          
         
          <h1>sidekick.AI</h1>
        </div>
      <h1>Text Liked</h1>
      <ul>
        {Array.isArray(textLiked) ? (
          textLiked.map((textliked, index) => (
            <li key={index}>{textliked}</li>
          ))
        ) : (
          <li>{textLiked}</li>
        )}
      </ul>
        
      </div>
      </div>
      </div>
  );}

export default TextLiked;
