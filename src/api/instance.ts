import axios from 'axios'
import keycloak from '../config/keycloakConfig';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(
    async (config) => {
        console.log('=== INTERCEPTOR DEBUG ===');
        console.log('keycloak.authenticated:', keycloak.authenticated);
        console.log('keycloak.token:', keycloak.token ? `${keycloak.token.substring(0, 20)}...` : 'UNDEFINED');
        
        if (keycloak.isTokenExpired?.(30)) {
            await keycloak.updateToken(30).catch(() => keycloak.logout());
        }

        const token = keycloak.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log('Authorization header:', config.headers.Authorization ? 'SET' : 'NOT SET');
        return config;
    },
    (error) => Promise.reject(error)
);

// instance.interceptors.request.use(
//     async (config) => {
//         // Garante que o token está válido antes de cada requisição
//         if (keycloak.isTokenExpired(30)) {
//             await keycloak.updateToken(30).catch(() => keycloak.logout());
//         }

//         const token = keycloak.token;
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance