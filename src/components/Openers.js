import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';
import DialogModal from './Dialogs/DialogLogin'; // Import the DialogModal component
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LikeButton } from './LikeButton';
import SimpleAlert from './AlertMui';

function Openers() {
  const [openers, setOpeners] = useState([]);
  const [openerType, setOpenerType] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [categories, setCategories] = useState([]); // State to store category names
  const [liked, setLiked] = useState(false); // State variable to track if the opener is liked
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open
  const [mockLike, setMockLike] = useState(false);
  const [showContainer, setShowContainer] = useState(false); // State to track if any category is opened
  const [alertMessage, setAlertMessage] = useState(null);

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
      
      if (response.data.length > 0) {
        setOpenerType(response.data[0].text);
        setMockLike(false);
        setAlertMessage(null);
      }
    } catch (error) {
      console.error("Error fetching openers by category:", error);
    }
  };
  
  const handleNextOpener = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % openers.length || 0);
    setMockLike(false);
    setAlertMessage(null);
  };              


  const handleCopyOpener = () => {
    navigator.clipboard.writeText(openers[currentIndex] || "")
      .then(() => alert("הועתק!"))
      .catch((err) => console.error('לא ניתן להעתיק: ', err));
  };

  const sendTextLiked = () => {
    if (!liked && isAuthenticated) {
      const userEmail = user.email;

      axios.post("https://web-production-dd6e3.up.railway.app/date/openers-liked", { email: userEmail, opener: openers[currentIndex] })
        .then(response => {
          console.log("Email sent successfully:");
          setAlertMessage("Like Successful");
         
        })
        .catch(error => {
          if (error.response && error.response.status === 303) {
            console.error("Request failed with status code 303");
            setAlertMessage("You already like that"); // Set message for error with status code 303
          } else {
            console.error("Error sending email:", error);
            setAlertMessage("Error sending email!"); // Set general error message
          }
        });
    } else if (!isAuthenticated) {
      console.error("User is not authenticated");
      // Handle case where user is not authenticated
    }
  };
  
  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="cool-move">

          <h1>משפטי פתיחה</h1>
          <div className="opener-filter">
            {/* Display category buttons */}
            {categories.map((category) => (
              <button key={category} onClick={() => {
                fetchOpenersByCategory(category);
                setShowContainer(true); // Set showContainer to true when a category is opened
              }}>
                {category}
              </button>
            ))}
          </div>
          {alertMessage && <SimpleAlert message={alertMessage}  />}

          {/* Conditionally render response container based on showContainer state */}
          {showContainer && (
            <div className="response-container">
              <div style={{ marginTop: "30px" }}>
                <p style={{ color: 'black', fontStyle: 'oblique',direction:"rtl" }}>{openers[currentIndex]}</p>

                <button className="copy-button" onClick={handleCopyOpener}>
                  <ContentCopyIcon />
                </button>

                <div style={{border:'none',borderRadius:'none'}} onClick={sendTextLiked}>
                  <LikeButton isLiked={mockLike} handleLike={() => setMockLike(!mockLike)} />
                </div>
              </div>
              <button onClick={handleNextOpener}>פתח הבא</button>
            </div>
            
          )}

          
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
