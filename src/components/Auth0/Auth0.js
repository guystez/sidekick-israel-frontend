import React from 'react'
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import Login from './Login';

const LoginPage = () => {
  // const classes = useStyles();

  return (
    <div>
    
          <Login></Login>
          
          </div>
        
  )
}

export default LoginPage

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1800,
//     },
//   },
// });

// const useStyles = makeStyles({
//   root: {
//     position: 'absolute',
//     top:' 50%',
//     left: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     minHeight:'50vh',
//     padding: '15px',
//     boxSizing: 'border-box',
//     fontFamily: 'Prompt, sans-serif',
//     lineHeight: '34px',
//     transform: 'translate(-50%, -50%)',
//     width: '90vw',
//     marginTop:50,
//     [theme.breakpoints.down("md")]: {
//       width: '100vw',
//       marginTop:0
//     },
//   },
//   section: {
//     display: 'flex',
//     flexDirection: 'column', // Make the section a column flex container
//     justifyContent: 'center',
//     alignContent: 'center',
//     border: '1px solid rgba(0,0,0,0.12)',
//     flex: '1', // Allow the section to expand and take up available space
//     borderRadius:15,
//     padding: '10px',
//     alignItems: 'center',
//   },
//   button:{
//     marginTop:20,
//   }
// })