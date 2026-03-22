/**
 * Instance axios partagée pour les endpoints protégés.
 * L'interceptor lit le token depuis authStore (Zustand) via getState(),
 * sans aucun accès à localStorage.
 *
 * Chaîne d'imports (pas de cycle) :
 *   noteService / tagService → http → authStore → authService → axios
 */
import axios from 'axios';
import useAuthStore from '../store/authStore';

const http = axios.create({ baseURL: '/api' });

http.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default http;