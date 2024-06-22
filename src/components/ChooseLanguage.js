import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'; // Import Axios

function ChooseLanguage({ userSideMessages }) {
    const [selectedSide, setSelectedSide] = useState(true);
    const { isAuthenticated, user } = useAuth0();
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [checked, setChecked] = useState(userSideMessages);

    const handleSwitchChange = (event) => {
        const newValue = event.target.checked;
        setSelectedSide(newValue);
        console.log("Switch value:", newValue ? 'ימין' : 'שמאל');
    };

    useEffect(() => {
        setSelectedSide(userSideMessages);
        setChecked(userSideMessages)
        console.log('userSideMessages@@@@@@: ',userSideMessages);
    }, [userSideMessages]);


    const sendToServer = () => {
        if (!isAuthenticated) {
            console.error("User not authenticated");
            return;
        }

        const userEmail = user.email; // Access the user's email from the user object
        const side = selectedSide ? 'left' : 'right'; // Convert boolean to string

        axios.post('http://127.0.0.1:8000/date/check-hebrew', { termsAccepted: true, selectedSide: side, email: userEmail })
            .then(response => {
                console.log(response.data, 'success');
                // Handle successful response if needed
            })
            .catch(error => {
                console.error(error.response.data, 'not success');
                // Handle error if needed
            });
    };

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
        <FormGroup style={{ marginTop: '10px' }}>
            <b>
                <p>בחר את הצד שלך בשיחה</p></b>
            <Stack direction="row" spacing={1} alignItems="center" style={{ justifyContent: "center" }}>
                <Typography>
                    <b>
                    שמאל</b>
                </Typography>
                <AntSwitch
                    checked={checked}
                    onChange={handleChange}
                    onClick={sendToServer}
                    inputProps={{ 'aria-label': 'ant design' }}
                />
                <Typography>
                    <b>
                        ימין
                    </b></Typography>
            </Stack>
        </FormGroup>
    )
    // const handleSwitchChange = (event) => {
    //     const newValue = event.target.checked;
    //     setSelectedSide(newValue);
    //     console.log("Switch value:", newValue ? 'ימין' : 'שמאל');
    // };




    // return (
    //     <div>
    //                <SwitchMui handleSwitchChange={handleSwitchChange}></SwitchMui>
    //          </div>
    // )
}

export default ChooseLanguage