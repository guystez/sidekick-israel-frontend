import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingButtonsTransition({ onClick, loading,buttonLabel }) {
  const handleClick = () => {
    if (!loading) {
      // Call the onClick function passed from props only if not loading
      onClick();
    }
  };

  return (
    <Button 
      variant="contained"
      style={{marginTop:'20px',marginBottom:'0.5vh'}}
      disabled={loading} // Disable the button while loading
      onClick={handleClick} // Call handleClick when the button is clicked
      startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
    >
      {loading ? '...עובדים על זה' : buttonLabel}
    </Button>
  );
}
