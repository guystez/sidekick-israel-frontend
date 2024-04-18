// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";

// const LoginButton = () => {
//   const { loginWithRedirect, isAuthenticated, isLoading ,user} = useAuth0();
//   const [authenticationChecked, setAuthenticationChecked] = useState(false); // Track if authentication status has been checked
//   const navigate = useNavigate(); // Get the navigate function from React Router

//   // Function to handle storing email in local storage
//   const storeEmailInLocalStorage = () => {
//     localStorage.setItem("userEmail", user?.email);
//   };

//   // Function to handle redirect after login
//   const handleLoginRedirect = () => {
//     storeEmailInLocalStorage(); // Call function to store email
//     const lastVisitedPage = localStorage.getItem("lastVisitedPage");
//     if (lastVisitedPage) {
//       navigate(lastVisitedPage); // Redirect to the last visited page
//     } else {
//       navigate("/"); // Redirect to the home page if no last visited page found
//     }
//   };

//   // Check authentication status multiple times
//   useEffect(() => {
//     if (!isLoading && !authenticationChecked) {
//       setAuthenticationChecked(true); // Set authenticationChecked to true after checking authentication status
//       if (isAuthenticated) {
//         handleLoginRedirect(); // Redirect if authenticated
//       }
//     }
//   }, [isAuthenticated, isLoading, authenticationChecked]);

//   return (
//     <div className="custom-home-page-login">
//       <div className="hero-login">
//         <div className="login-move">
//           <h1>Mentor</h1>
//           <p1>Workflow</p1>
//           {/* <p class="subtitle">Efficiency</p>  */}
//         </div>
//       </div>

//       <div className="sub-login">
//         <div className="btn-login" >
//           <button className='log-button button0 button2' onClick={() => {
//             loginWithRedirect();
//           }}>
//             Login
//           </button>
//         </div>
//         <div className="btn-signup">
//           <button className='log-button button0 button2' onClick={() => {
//             loginWithRedirect();
//           }}>                  
//             Signup
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginButton;
