import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadFile({ onChange,fileInputRef}) {
  const handleFileChange = (e) => {
    if (onChange) {
      onChange(e); // Call the onChange prop with the event object
    }
  };

  return (
    <Button style={{marginTop:'10px',marginBottom:'10px'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      העלה תצלום מסך
      <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
       {/* Pass handleFileChange to the onChange event */}
    </Button>
  );
}
