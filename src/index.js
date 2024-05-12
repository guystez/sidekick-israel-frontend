// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    // domain={process.env.REACT_APP_AUTO_0_DOMAIN_LOCAL}
    // clientId={process.env.REACT_APP_AUTO_0_CLIENTID_LOCAL}
    domain={process.env.REACT_APP_AUTO_0_DOMAIN_PRODUCTION}
    clientId={process.env.REACT_APP_AUTO_0_CLIENTID_PRODUCTION}
    authorizationParams={{
      redirect_uri: window.location.origin+"/Main"
    }}
  >
    <App />
  </Auth0Provider>,
);