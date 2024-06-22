import React, { useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LogoutButton from './Auth0/Logout';
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook
import Icon from "../logo_white_text.png";
import coin from "../coin.png";
import { RequestContext } from './RequestContext';
import { IoIosSettings } from "react-icons/io";
import { PiListHeartFill } from "react-icons/pi";
import { BsSearchHeartFill } from "react-icons/bs";
import { BsHearts } from "react-icons/bs";
import { MdForum } from "react-icons/md";

const NavBar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0(); // Get isAuthenticated from useAuth0 hook
  const { requestLeft } = useContext(RequestContext);

  useEffect(() => {
    console.log('useEffect: requestLeft:', requestLeft);
  }, [requestLeft]);

  const handleNavigate = () => {
    navigate("/Main"); // Navigate to the home page
  };

  const handleLinkClick = (event) => {
    // Close the menu when a link is clicked
    setMenuOpen(false);
    // Prevent the default behavior of the link
    // event.preventDefault();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the menu
      if (menuOpen && !event.target.closest('.menu') && !event.target.closest('.menu-icon')) {
        setMenuOpen(false);
      }
    };

    // Add event listener for clicks outside the menu
    document.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div className="title-logo-container">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      {menuOpen && (
        <div className="menu">
          <Link style={{border:'0.1px solid #ccc'}} to="/Main" onClick={handleLinkClick}>
          <BsHearts />
            אפליקציה
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/openers" onClick={handleLinkClick}>
              <BsSearchHeartFill />
                משפטי פתיחה
              </Link>
              <Link to="/openersliked" onClick={handleLinkClick}>
              <PiListHeartFill />
                מועדפים
              </Link>
              <Link to="/forum" onClick={handleLinkClick}>
              <MdForum />
                פורום
              </Link>
              <Link to="/settings" onClick={handleLinkClick}>
              <IoIosSettings />
              הגדרות
              </Link>
              <LogoutButton />
            </>
          )}
        </div>
      )}
      {/* <h1 onClick={() => { handleNavigate(); handleLinkClick(); }} style={{ fontFamily: '"Secular One", sans-serif',cursor: 'pointer', fontSize:'larger',marginTop:'5px' }}>ChatMates.AI</h1> */}
      <div>
      <img src={Icon} style={{width:'70px',height:'60px',cursor: 'pointer'}} onClick={() => { handleNavigate(); handleLinkClick(); }}></img>
      </div>
      <div
  style={{
    fontFamily: '"Secular One", sans-serif',
    fontSize: 'x-large',
    position: 'absolute',
    left: '0',
    marginLeft: '10px'
  }}
>
  <img
    src={coin}
    style={{
      width: '30px',
      boxShadow: 'none',
      marginRight: '10px',
      marginBottom: '5px'
    }}
    alt="Coin Icon"
  />
  {requestLeft !== undefined ? ( // Check if requestLeft is defined
    <>
      {requestLeft > 0 ? requestLeft : 0} {/* Display requestLeft or 0 */}
    </>
  ) : (
    0 // Display 0 if requestLeft is undefined
  )}
</div>
    </div>
  );
};

export default NavBar;
