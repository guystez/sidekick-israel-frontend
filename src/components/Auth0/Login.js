import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  // Function to handle storing email in local storage
  const storeEmailInLocalStorage = () => {
    localStorage.setItem("userEmail", user?.email);
  
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
            Hello!
          <h2>{user.name}</h2>
          
        </div>
      ) : (
        <button onClick={() => {
          loginWithRedirect();
          storeEmailInLocalStorage(); // Call function to store email
        }}>Log In</button>
      )}
    </>
  );
};

export default LoginButton;
