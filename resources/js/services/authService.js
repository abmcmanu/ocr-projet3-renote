/**
 * authService — endpoints publics (login, register) + logout.
 * Utilise axios brut (pas http.js) pour éviter toute dépendance circulaire
 * avec authStore (authStore → authService → http → authStore).
 * Le token de logout est passé en paramètre depuis authStore.
 */
import axios from 'axios';

const BASE_URL = '/api';

export async function login(email, password) {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data.data;
}

export async function register(name, email, password) {
    const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
    return response.data.data;
}

export async function logout(token) {
    const response = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return response.data.data;
}