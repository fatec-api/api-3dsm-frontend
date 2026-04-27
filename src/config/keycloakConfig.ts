import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8081', 
  realm: 'java-the-hutt',         
  clientId: 'jth-frontend'    
};

const keycloak = new Keycloak(keycloakConfig);
export default keycloak;