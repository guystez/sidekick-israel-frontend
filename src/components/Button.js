import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogFeedBack from './Dialogs/DialogFeedBack';

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
            <div>
                <Button variant="contained" size="small" onClick={handleButtonClick}>
                    FeedBack
                </Button>
                <DialogFeedBack open={showAuthDialog} onClose={() => setShowAuthDialog(false)} handleCancel={handleClose} />
            </div>
        </Box>
    );
}
