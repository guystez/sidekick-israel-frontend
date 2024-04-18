  import React from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth0 } from "@auth0/auth0-react";

  const NavBar = ({ menuOpen, setMenuOpen }) => {
    const { isAuthenticated, user } = useAuth0();

    const handleLinkClick = (event) => {
      // Close the menu when a link is clicked
      setMenuOpen(false);
      // Prevent the default behavior of the link
      // event.preventDefault();
    };

    return (
      <div className="title-logo-container">

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {/* {user && <p>{user.name}</p>} */}


          ☰
        </div>
        {menuOpen && (
          <div className="menu">
            <Link to="/" onClick={handleLinkClick}>
              דף הבית
            </Link>
            <Link to="/openersliked" onClick={handleLinkClick}>
              Openers Liked
            </Link>
            <Link to="/openers" onClick={handleLinkClick}>
              Openers
            </Link>
            <Link to="/textliked" onClick={handleLinkClick}>
              Text Liked
            </Link>
            <Link to="/forum" onClick={handleLinkClick}>
              Forum
            </Link>
          </div>
        )}
        <h1>sidekick.AI</h1>
      </div>
    );
  };

  export default NavBar;
