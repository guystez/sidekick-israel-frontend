import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

export default function SimpleAlert({ message }) {
  const [isVisible, setIsVisible] = useState(false); // Start with isVisible as false

  useEffect(() => {
    if (message) { // Only show if there's a message to display
      setIsVisible(true); // Show the alert
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the alert after 1.5 seconds
      }, 1800);

      return () => clearTimeout(timer); // Clear the timeout on component unmount
    }
  }, [message]); // Trigger effect when message changes

  return (
    <>
      {isVisible && (
        <Alert icon={false} severity="success">
          {message}
        </Alert>
      )}
    </>
  );
}
