import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloakInstance from './keycloak';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

keycloakInstance.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256'
}).then(authenticated => {
    if (!authenticated) {
        keycloakInstance.login();
    } else {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <App keycloak={keycloakInstance} />
            </React.StrictMode>
        );
    }
}).catch(err => {
    console.error('Keycloak failed to initialize', err);
});
