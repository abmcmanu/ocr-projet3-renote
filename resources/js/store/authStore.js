import { create } from 'zustand';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

const useAuthStore = create((set, get) => ({
    user: null,
    // Lecture initiale depuis localStorage ici uniquement — aucun autre fichier n'y accède.
    token: localStorage.getItem('renote_token'),
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const data = await apiLogin(email, password);
            localStorage.setItem('renote_token', data.token);
            set({ user: data.user, token: data.token, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            // On passe le token depuis l'état du store (pas de localStorage dans le service).
            await apiLogout(get().token);
        } catch {
            // Token déjà invalide côté serveur : on nettoie quand même.
        } finally {
            localStorage.removeItem('renote_token');
            set({ user: null, token: null, loading: false });
        }
    },

    // Conservé pour la compatibilité API — ne fait plus rien car le token
    // est déjà initialisé à la création du store.
    initFromStorage: () => {},
}));

export default useAuthStore;