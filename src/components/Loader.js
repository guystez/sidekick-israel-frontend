import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import HeartSpinner2 from './SpinnerHeart/CircularProgressColor';
import HeartSpinner3 from './SpinnerHeart/HeartSpinner3';

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
      style={{
        marginTop: '20px',
        fontFamily: '"Secular One", sans-serif',
        marginBottom:'30px',
        
      }}
      disabled={loading}
      onClick={handleClick}
      startIcon={
        loading ? (
          // startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
      // startIcon={loading ? <HeartSpinner2 size={5}  />  : <SendIcon />}
          <HeartSpinner3  /> // Adjust vertical position of icon
        ) : (
          <SendIcon />
        )
      }
    >
      <span style={{ marginTop: loading ? '2px' : '0px' }}>
        {loading ? '...עובדים על זה' : buttonLabel}
      </span>
    </Button>
  );
};
