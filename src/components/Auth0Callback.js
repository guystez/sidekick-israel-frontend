import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth0Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the authentication callback from Auth0 here
    // and then navigate to the desired route (e.g., /Main)
    navigate('/Main');
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Auth0Callback;