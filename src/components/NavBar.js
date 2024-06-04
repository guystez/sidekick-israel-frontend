import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LogoutButton from './Auth0/Logout';
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook


const NavBar = ({ menuOpen, setMenuOpen }) => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0(); // Get isAuthenticated from useAuth0 hook

  const handleNavigate = () => {
    navigate("/Main"); // Navigate to the home page
  };

  const handleLinkClick = (event) => {
    // Close the menu when a link is clicked
    setMenuOpen(false);
    // Prevent the default behavior of the link
    // event.preventDefault();
  };

  return (
    <div className="title-logo-container">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      {menuOpen && (
        <div className="menu">
          {/* <Link to="/" onClick={handleLinkClick}>
            דף הבית
          </Link> */}
          <Link to="/Main" onClick={handleLinkClick}>
            אפליקציה
          </Link>
          {isAuthenticated && ( // Render navigation links only if user is authenticated
            <>
              <Link to="/openers" onClick={handleLinkClick}>
                משפטי פתיחה
              </Link>
              <Link to="/openersliked" onClick={handleLinkClick}>
                מועדפים
              </Link>

              
              <Link to="/forum" onClick={handleLinkClick}>
                פורום
              </Link>
              <Link to="/settings" onClick={handleLinkClick}>
                הגדרות
              </Link>

              <LogoutButton />
            </>
          )}
        </div>
      )}
      <h1 onClick={() => { handleNavigate(); handleLinkClick(); }} style={{ cursor: 'pointer' }}>ChatMates.AI</h1>

    </div>
  );
};


export default NavBar;
