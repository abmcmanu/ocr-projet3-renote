import axios from 'axios';

const BASE_URL = '/api';

function authHeaders() {
    const token = localStorage.getItem('renote_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getNotes() {
    const response = await axios.get(`${BASE_URL}/notes`, { headers: authHeaders() });
    return response.data.data;
}

export async function createNote(tag_id, text) {
    const response = await axios.post(
        `${BASE_URL}/notes`,
        { tag_id, text },
        { headers: authHeaders() }
    );
    return response.data.data;
}

export async function deleteNote(id) {
    const response = await axios.delete(`${BASE_URL}/notes/${id}`, { headers: authHeaders() });
    return response.data.data;
}