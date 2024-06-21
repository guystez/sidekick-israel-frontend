import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate} from "react-router-dom";
import { RequestContext } from '../RequestContext';
import { CgLogOut } from "react-icons/cg";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const { resetRequestLeft } = useContext(RequestContext);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin+"/" });
    resetRequestLeft();
    localStorage.removeItem('isLoggedIn');
    navigate("/Main");

  };

  return (
    <button onClick={handleLogout}>
      <CgLogOut />
      התנתק
    </button>
  );
};

export default LogoutButton;
