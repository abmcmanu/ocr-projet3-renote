/**
 * authService — endpoints publics (login, register, forgot/reset password)
 * + logout et resendVerification (nécessitent un token passé en paramètre).
 * Utilise axios brut pour éviter toute dépendance circulaire avec authStore.
 */
import axios from 'axios';

const BASE_URL = '/api';

export async function login(email, password) {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data.data;
}

export async function register(name, email, password, password_confirmation) {
    const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password, password_confirmation });
    return response.data.data;
}

export async function forgotPassword(email) {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    return response.data;
}

export async function resetPassword(token, email, password, password_confirmation) {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, { token, email, password, password_confirmation });
    return response.data;
}

export async function resendVerification(token) {
    const response = await axios.post(
        `${BASE_URL}/auth/email/resend`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return response.data;
}

export async function logout(token) {
    const response = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return response.data.data;
}