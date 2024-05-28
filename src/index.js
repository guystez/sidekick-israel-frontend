import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Handle PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

const showInstallPromotion = () => {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      }
    });
  }
};

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTO_0_DOMAIN_LOCAL}
    clientId={process.env.REACT_APP_AUTO_0_CLIENTID_LOCAL}
    // domain={process.env.REACT_APP_AUTO_0_DOMAIN_PRODUCTION}
    // clientId={process.env.REACT_APP_AUTO_0_CLIENTID_PRODUCTION}
    authorizationParams={{
      redirect_uri: window.location.origin + "/Main"
    }}
  >
    <App />
    {/* <button id="install-button" style={{ display: 'none' }}>Install App</button> */}
  </Auth0Provider>,
);
