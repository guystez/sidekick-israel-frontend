import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

export default function SimpleAlert({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the alert after 1.5 seconds
    }, 1500);

    return () => clearTimeout(timer); // Clear the timeout on component unmount
  }, []);

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
