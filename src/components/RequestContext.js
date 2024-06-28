import React, { createContext, useState } from 'react';

// Create a Context
const RequestContext = createContext();

// Create a Provider component
const RequestProvider = ({ children }) => {
  const [requestLeft, setRequestLeft] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);

  // Function to update request left
  const updateRequestLeft = (newRequestLeft) => {
    setRequestLeft(newRequestLeft);
  };

  // Function to update days remaining
  const updateDaysRemaining = (newDaysRemaining) => {
    setDaysRemaining(newDaysRemaining);
  };

  // Function to update hours remaining
  const updateHoursRemaining = (newHoursRemaining) => {
    setHoursRemaining(newHoursRemaining);
  };

  // Function to reset all values
  const resetAll = () => {
    setRequestLeft(0);
    setDaysRemaining(0);
    setHoursRemaining(0);
  };

  return (
    <RequestContext.Provider 
      value={{ 
        requestLeft, 
        updateRequestLeft, 
        daysRemaining, 
        updateDaysRemaining, 
        hoursRemaining, 
        updateHoursRemaining, 
        resetAll 
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export { RequestContext, RequestProvider };
