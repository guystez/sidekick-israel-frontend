import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function ActionAlerts({ showAlert }) {
    console.log("Show alert:", showAlert); // Add this line for debugging
  
    if (!showAlert) {
        return null; // If showAlert is false, don't render the alert
    }
  
    return (
        <Stack sx={{ width: '100%', transition: 'opacity 0.5s' }}>
            <Alert severity="error" style={{ opacity: showAlert ? 1 : 0 }}>העלה צילום מסך בבקשה </Alert>
        </Stack>
    );
}
