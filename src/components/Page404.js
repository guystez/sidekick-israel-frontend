import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
         <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move" style={{ direction: 'rtl' }}></div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Plesae go back to the main page</p>
        <Link to='/Main' style={{padding:'20px',color:'black',border: '1px solid #ccc',fontSize:'x-large',borderRadius:'10px'}}> Go Back</Link>      
    </div>
    </div>
  );
}

export default NotFound;
