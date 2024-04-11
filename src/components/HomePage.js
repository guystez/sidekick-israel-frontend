import React, { useState } from 'react';
import axios from 'axios';
import logofire from '/Users/user/Desktop/Front-end projects/sidekik_israel_frontend/sidekik_israel/src/logofire.png';

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseFromServer).then(() => {
      alert('Response copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };
  

  const handleSendImage = async () => {
    if (imageFile) {
      console.log('Preparing to send image...');
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        console.log('Sending image to the server...');
        const response = await axios.post('https://web-production-dd6e3.up.railway.app/date', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image sent to the server.');
        console.log(response.data);
        setResponseFromServer(JSON.stringify(response.data));
        console.log(response.data, 'thisssssss');
      } catch (error) {
        console.error('Error sending image to server:', error);
        setResponseFromServer('לא הצלחנו לשלוח את תצלום המסך שלך.');
      }
    }
  };

  return (
    <div className="custom-home-page">
      <div className="hero">
      <div class="circle"></div>
        <div className="cool-move">
          <div className="title-logo-container">
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
            {menuOpen && (
              <div className="menu">
                <a href="/openers">Openers</a>
              </div>
            )}
            <img src={logofire} alt="Logo" className="logo" />
            <h1>sidekick.AI</h1>
          </div>
          <p>העלה תצלום מסך!</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <div className="border">
              <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
            </div>
          )}
          <button onClick={handleSendImage}>שלח</button>
          {responseFromServer && (
  <div className="response-container">
    {responseFromServer}
    <button 
  onClick={copyToClipboard} 
  style={{
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    padding: '4px 4px', // Reduced padding
    fontSize: '10px', // Smaller font size
    lineHeight: '1', // Adjust line height to fit the font size
    backgroundColor: 'lightgray', // Optional: add a background color for better visibility
    border: '1px solid darkgray', // Optional: add a border for clarity
    borderRadius: '5px', // Optional: round the corners for a softer look
  }}
>
  העתק
</button>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default HomePage;