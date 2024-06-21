// RequestContext.js
import React, { createContext, useState } from 'react';

// Create a Context
const RequestContext = createContext();

// Create a Provider component
const RequestProvider = ({ children }) => {
  const [requestLeft, setRequestLeft] = useState(0);

  // Function to update request left
  const updateRequestLeft = (newRequestLeft) => {
    setRequestLeft(newRequestLeft);
  };

  // Function to reset request left
  const resetRequestLeft = () => {
    setRequestLeft(0);
  };

  return (
    <RequestContext.Provider value={{ requestLeft, updateRequestLeft, resetRequestLeft }}>
      {children}
    </RequestContext.Provider>
  );
};

export { RequestContext, RequestProvider };
