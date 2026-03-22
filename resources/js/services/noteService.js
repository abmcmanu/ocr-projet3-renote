import http from './http';

export async function getNotes() {
    const response = await http.get('/notes');
    return response.data.data;
}

export async function createNote(tag_id, text) {
    const response = await http.post('/notes', { tag_id, text });
    return response.data.data;
}

export async function deleteNote(id) {
    const response = await http.delete(`/notes/${id}`);
    return response.data.data;
}