import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {  Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DialogModal from './DialogLogin'; // Import the DialogModal component

function Openers() {
  const [openers, setOpeners] = useState([]);
  const [openerType, setOpenerType] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [categories, setCategories] = useState([]); // State to store category names
  const [liked, setLiked] = useState(false); // State variable to track if the opener is liked
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post("https://web-production-dd6e3.up.railway.app/date/get-categories"); // Fetch category names
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchOpenersByCategory = async (categoryName) => {
    // Check if user is authenticated before fetching openers
    if (!isAuthenticated) {
      setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      return;
    }
  
    try {
      const response = await axios.post("https://web-production-dd6e3.up.railway.app/date/get-categories-by-name", { category_name: categoryName });
      setOpeners(response.data);
      console.log(response.data);
      if (response.data.length > 0) {
        setOpenerType(response.data[0].text);
      }
    } catch (error) {
      console.error("Error fetching openers by category:", error);
    }
  };
  
  const handleNextOpener = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % openers.length || 0);
  };

  const handleCopyOpener = () => {
    navigator.clipboard.writeText(openers[currentIndex] || "")
      .then(() => alert("הועתק!"))
      .catch((err) => console.error('לא ניתן להעתיק: ', err));
  };

  const sendTextLiked = () => {
    if (!liked && isAuthenticated) { // Check if the opener has not been liked and user is authenticated
      const userEmail = user.email; // Get email from user object
      console.log("User email:", userEmail);
      axios.post("https://web-production-dd6e3.up.railway.app/date/openers-liked", { email: userEmail, opener: openers[currentIndex] })
        .then(response => {
          console.log("Email sent successfully:", response.data);
          // Update state to indicate that the opener has been liked
          setLiked(true);
        })
        .catch(error => {
          console.error("Error sending email:", error);
          // Handle error accordingly
        });
    } else if (!isAuthenticated) {
  
      console.error("User is not authenticated");
      // Handle case where user is not authenticated
    }
  };
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
  return (
  <div className="custom-home-page">
    <div className="hero">
      <div className="cool-move">
        <h1>משפטי פתיחה</h1>
        <div className="opener-filter">
          {/* Display category buttons */}
          {categories.map((category) => (
            <button key={category} onClick={() => fetchOpenersByCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        <div className="response-container">
          <p>{openers[currentIndex]}</p>
          <button onClick={handleNextOpener}>פתח הבא</button>
          <button onClick={handleCopyOpener}>העתק</button>
          {/* Disable the button if opener is liked */}
          <button onClick={sendTextLiked} disabled={liked}>אהבתי</button>
        </div>
      </div>
    </div>
    {/* Render the DialogModal component if showAuthDialog is true */}
    {showAuthDialog && (
  <DialogModal
    handleConfirm={() => setShowAuthDialog(false)}
    handleCancel={() => setShowAuthDialog(false)}
  />
)}

  </div>
);

};
export default Openers;
