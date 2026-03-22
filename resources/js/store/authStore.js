import { create } from 'zustand';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

const useAuthStore = create((set) => ({
    user: null,
    token: null,
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
            await apiLogout();
        } catch {
            // token déjà invalide côté serveur : on nettoie quand même
        } finally {
            localStorage.removeItem('renote_token');
            set({ user: null, token: null, loading: false });
        }
    },

    initFromStorage: () => {
        const token = localStorage.getItem('renote_token');
        if (token) {
            set({ token });
        }
    },
}));

export default useAuthStore;