import axios from 'axios';

const BASE_URL = '/api';

function authHeaders() {
    const token = localStorage.getItem('renote_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTags() {
    const response = await axios.get(`${BASE_URL}/tags`, { headers: authHeaders() });
    return response.data.data;
}

export async function createTag(name) {
    const response = await axios.post(
        `${BASE_URL}/tags`,
        { name },
        { headers: authHeaders() }
    );
    return response.data.data;
}