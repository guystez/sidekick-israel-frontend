import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
//       .then(registration => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch(error => {
//         console.log('Service Worker registration failed:', error);
//       });
//   });
// }


const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    // domain={process.env.REACT_APP_AUTO_0_DOMAIN_LOCAL}
    // clientId={process.env.REACT_APP_AUTO_0_CLIENTID_LOCAL}
    domain={process.env.REACT_APP_AUTO_0_DOMAIN_PRODUCTION}
    clientId={process.env.REACT_APP_AUTO_0_CLIENTID_PRODUCTION}
    authorizationParams={{
      redirect_uri: window.location.origin + "/Main"
    }}
  >
    <App />
    {/* <button id="install-button" style={{ display: 'none' }}>Install App</button> */}
  </Auth0Provider>,
  
);
