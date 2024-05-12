import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function SwitchMui({ handleSwitchChange }) {
  const [checked, setChecked] = useState(true);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === '#1890ff' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === '#1890ff' ? '#1890ff' : '#1890ff',
      boxSizing: 'border-box',
    },
  }));

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    console.log("Switch value:", newValue ? 'ימין' : 'שמאל');
    handleSwitchChange(event);
  };

  return (
    <FormGroup>
      בחר צד טלפון
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>שמאל</Typography>
        <AntSwitch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'ant design' }}
        />
        <Typography>ימין</Typography>
      </Stack>
    </FormGroup>
  )
}
export default SwitchMui;
