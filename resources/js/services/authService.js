import axios from 'axios';

const BASE_URL = '/api';

function authHeaders() {
    const token = localStorage.getItem('renote_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email, password) {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data.data;
}

export async function register(name, email, password) {
    const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
    return response.data.data;
}

export async function logout() {
    const response = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { headers: authHeaders() }
    );
    return response.data.data;
}