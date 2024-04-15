import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Openers() {
  const [openers, setOpeners] = useState([]);
  const [openerType, setOpenerType] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [categories, setCategories] = useState([]); // State to store category names

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post("https://web-production-dd6e3.up.railway.app/date-get-categories"); // Fetch category names
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchOpenersByCategory = async (categoryName) => {
    try {
      const response = await axios.post("https://web-production-dd6e3.up.railway.app/date-get-categories-by-name", { category_name: categoryName });
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
    if (isAuthenticated) {
      const userEmail = user.email; // Get email from user object
      console.log("User email:", userEmail);
      axios.post("https://web-production-dd6e3.up.railway.app/date-openers-liked", { email: userEmail ,opener:(openers[currentIndex])})
        .then(response => {
          console.log("Email sent successfully:", response.data);
          // You can add further logic here if needed
        })
        .catch(error => {
          console.error("Error sending email:", error);
          // Handle error accordingly
        });
    } else {
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
              <button key={category} onClick={() => fetchOpenersByCategory(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="response-container">
            <p>{openers[currentIndex]}</p>
            <button onClick={handleNextOpener}>פתח הבא</button>
            <button onClick={handleCopyOpener}>העתק</button>
            <button onClick={sendTextLiked}>אהבתי</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Openers;
