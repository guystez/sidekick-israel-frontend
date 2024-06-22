import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { RequestProvider } from './components/RequestContext';


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
  <RequestProvider>
      <App />
    </RequestProvider>
  </Auth0Provider>
  
);
