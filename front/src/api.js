import keycloakInstance from './keycloak';

export async function apiFetch(url, options = {}) {
    if (!options.headers) options.headers = {};

    await keycloakInstance.updateToken(30).catch(() => keycloakInstance.login());
    options.headers['Authorization'] = 'Bearer ' + keycloakInstance.token;

    console.log('Auth Token:', keycloakInstance.token);
    console.log('Fetch Options:', options);

    const result = await fetch(url, options);

    if (result.status === 401) {
        keycloakInstance.login();
        throw new Error('Unauthorized - Token invalid (401)');
    }
    if (result.status === 403) {
        throw new Error('Forbidden - Access denied (403)');
    }
    return result;
}