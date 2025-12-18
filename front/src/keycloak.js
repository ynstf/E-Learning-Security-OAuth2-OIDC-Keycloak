import Keycloak from 'keycloak-js';

const keycloakInstance = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'elearning-realm',
    clientId: 'react-client'
});

export default keycloakInstance;