import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin+"/" });
    localStorage.removeItem('isLoggedIn');
    navigate("/");

  };

  return (
    <button onClick={handleLogout}>
      התנתק
    </button>
  );
};

export default LogoutButton;
