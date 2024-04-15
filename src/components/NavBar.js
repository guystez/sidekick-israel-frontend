import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ menuOpen, setMenuOpen }) => {
  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    setMenuOpen(false);
  };

  return (
    <div className="title-logo-container">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
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
        </div>
      )}
      <h1>sidekick.AI</h1>
    </div>
  );
};

export default NavBar;
