import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import DialogModal from "./Dialogs/DialogLogin"; // Import the DialogModal component
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LikeButton } from "./LikeButton";
import SimpleAlert from "./AlertMui";
import { Link } from "react-router-dom";
import HeartSpinner from "./SpinnerHeart/HeartSpinner";

function Openers() {
  const [openers, setOpeners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [categories, setCategories] = useState([]); // State to store category names
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open
  const [mockLike, setMockLike] = useState(false);
  const [showContainer, setShowContainer] = useState(false); // State to track if any category is opened
  const [alertMessage, setAlertMessage] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/date/get-categories"
        ); // Fetch category names
        setCategories(response.data);
        setIsPageLoading(false);
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
      const response = await axios.post(
        "http://127.0.0.1:8000/date/get-categories-by-name",
        { category_name: categoryName }
      );
      setOpeners(response.data);

      if (response.data.length > 0) {
        // setOpenerType(response.data[0].text);
        setMockLike(false);
        setAlertMessage(null);
        setShowContainer(true);
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

  const handlePreviousOpener = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + openers.length) % openers.length || 0
    );
    setMockLike(false);
    setAlertMessage(null);
  };

  const handleCopyOpener = () => {
    navigator.clipboard
      .writeText(openers[currentIndex] || "")
      .then(() => setAlertMessage("הועתק"))
      .catch((err) => console.error("לא ניתן להעתיק: ", err));
  };

  const sendTextLiked = () => {
    if (isAuthenticated) {
      const userEmail = user.email;
      const url = "http://127.0.0.1:8000/date/openers-liked";
      if (mockLike) {
        setMockLike(false);
        axios
          .delete(url, {
            params: { email: userEmail, opener: openers[currentIndex] },
          })
          .then((response) => {
            console.log("Opener unliked successfully:");
            setAlertMessage("נמחק");
          })
          .catch((error) => {
            console.error("Error unliking opener:", error);
            setAlertMessage("בעיה בשליחה"); // Set general error message
          });
      } else {
        setMockLike(true);
        axios
          .post(url, { email: userEmail, opener: openers[currentIndex] })
          .then((response) => {
            console.log("Email sent successfully:");
            setAlertMessage("לייק בוצע");
          })
          .catch((error) => {
            if (error.response && error.response.status === 303) {
              console.error("Request failed with status code 303");
              setAlertMessage("כבר אהבת את זה"); // Set message for error with status code 303
            } else {
              console.error("Error sending email:", error);
              setAlertMessage("בעיה בשליחה"); // Set general error message
            }
          });
      }
    } else {
      console.error("User is not authenticated");
      // Handle case where user is not authenticated
    }
  };

  return (
    <div className="custom-home-page">
      <div className="hero" >
        <div className="cool-move">
          
          {isPageLoading ? (
            <HeartSpinner />
          ) : (
            <>
            
              {!isPageLoading && (
                
                <div className="opener-filter">
                  <h1>משפטי פתיחה</h1>
                  <p>בחר משפט פתיחה לפי קטגוריה</p>
                  {/* Display category buttons */}
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        fetchOpenersByCategory(category);
                        // setShowContainer(true); // Set showContainer to true when a category is opened
                      }}
                    >
                      <b style={{ fontStyle: "oblique" }}>{category}</b>
                    </button>
                  ))}
                </div>
              )}

              {alertMessage && <SimpleAlert message={alertMessage} />}

              {/* Conditionally render response container based on showContainer state */}
              {showContainer && categories.length > 0 && (
                <div className="response-container">
                  <div style={{ marginTop: "30px" }}>
                    <b>
                      <p
                        style={{
                          color: "black",
                          fontStyle: "oblique",
                          direction: "rtl",
                        }}
                      >
                        {openers[currentIndex]}
                      </p>
                    </b>
                    <button className="copy-button" onClick={handleCopyOpener}>
                      <ContentCopyIcon />
                    </button>

                    <div
                      style={{ border: "none", borderRadius: "none" }}
                      onClick={sendTextLiked}
                    >
                      <LikeButton
                        isLiked={mockLike}
                        handleLike={() => setMockLike(!mockLike)}
                      />
                    </div>
                  </div>
                  <button onClick={handlePreviousOpener}>קודם</button>
                  <button onClick={handleNextOpener}>הבא</button>
                </div>
              )}
              {showContainer && (
                <div style={{ marginTop: "40px" }}>
                  <button>
                    <Link to="/openersliked">חזור למועדפים</Link>
                  </button>
                </div>
              )}
            </>
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
}

export default Openers;
