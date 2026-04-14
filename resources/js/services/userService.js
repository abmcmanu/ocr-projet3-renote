import http from './http';

export async function getUser() {
    const response = await http.get('/user');
    return response.data.data;
}

export async function updateProfile(name, email) {
    const response = await http.put('/user/profile', { name, email });
    return response.data.data;
}

export async function updatePassword(current_password, password, password_confirmation) {
    const response = await http.put('/user/password', { current_password, password, password_confirmation });
    return response.data.data;
}

export async function deleteAccount(password) {
    const response = await http.delete('/user', { data: { password } });
    return response.data.data;
}