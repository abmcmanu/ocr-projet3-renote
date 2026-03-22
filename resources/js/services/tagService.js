import http from './http';

export async function getTags() {
    const response = await http.get('/tags');
    return response.data.data;
}

export async function createTag(name) {
    const response = await http.post('/tags', { name });
    return response.data.data;
}