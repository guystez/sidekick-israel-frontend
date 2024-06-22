import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogFeedBack from './Dialogs/DialogFeedBack';
import { BsFillEnvelopeOpenHeartFill } from "react-icons/bs";

export default function ButtonSizes() {
    const [showAuthDialog, setShowAuthDialog] = useState(false); // Change initial state to false

    const handleClose = () => {
        setShowAuthDialog(false); // Close the dialog
    };

    const handleButtonClick = () => {
        setShowAuthDialog(true); // Open the dialog
        console.log("OPEN FEEDBACK");
    };

    return (
        <Box sx={{ '& button': { m: 1 }, bottom: 0, left: 0 }}>
            <div style={{marginLeft:'9px'}}>
      <Button 
        style={{ 
          fontFamily: '"Secular One", sans-serif', 
          display: 'flex', 
          alignItems: 'center' 
        }} 
        variant="contained" 
        size="small" 
        onClick={handleButtonClick}
      >
        <BsFillEnvelopeOpenHeartFill style={{ marginRight: '8px' }} />
        FeedBack
      </Button>
      <DialogFeedBack 
        open={showAuthDialog} 
        onClose={handleClose} 
        handleCancel={handleClose} 
      />
    </div>
        </Box>
    );
}
