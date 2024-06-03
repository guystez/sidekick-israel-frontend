import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

const AddToHomeScreenPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // For debugging, set to true initially

  useEffect(() => {
    const handler = (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      console.log('Deferred Prompt available:', deferredPrompt);
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    } else {
      console.log('No deferred prompt available');
    }
  };

  return (
    isVisible && (
      <Button variant="contained" size="small" onClick={handleAddToHomeScreen}>
        אפליקציה
      </Button>
    )
  );
};

export default AddToHomeScreenPrompt;
