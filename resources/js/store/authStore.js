import { create } from 'zustand';
import { login as apiLogin, logout as apiLogout, register as apiRegister, resendVerification as apiResendVerification } from '../services/authService';
import { getUser, updateProfile as apiUpdateProfile, updatePassword as apiUpdatePassword, deleteAccount as apiDeleteAccount } from '../services/userService';

const useAuthStore = create((set, get) => ({
    user: null,
    // Initialisé directement depuis localStorage — seul endroit qui y accède.
    token: localStorage.getItem('renote_token'),
    loading: false,
    error: null,

    fetchUser: async () => {
        if (!get().token) return;
        try {
            const user = await getUser();
            set({ user });
        } catch {
            // Token invalide : on nettoie
            localStorage.removeItem('renote_token');
            set({ token: null, user: null });
        }
    },

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

    register: async (name, email, password, password_confirmation) => {
        set({ loading: true, error: null });
        try {
            const data = await apiRegister(name, email, password, password_confirmation);
            localStorage.setItem('renote_token', data.token);
            set({ user: data.user, token: data.token, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await apiLogout(get().token);
        } catch {
            // Token déjà invalide côté serveur : on nettoie quand même.
        } finally {
            localStorage.removeItem('renote_token');
            set({ user: null, token: null, loading: false });
        }
    },

    resendVerification: async () => {
        set({ loading: true, error: null });
        try {
            await apiResendVerification(get().token);
            set({ loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },

    updateProfile: async (name, email) => {
        set({ loading: true, error: null });
        try {
            const user = await apiUpdateProfile(name, email);
            set({ user, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
            throw err;
        }
    },

    updatePassword: async (current_password, password, password_confirmation) => {
        set({ loading: true, error: null });
        try {
            await apiUpdatePassword(current_password, password, password_confirmation);
            set({ loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
            throw err;
        }
    },

    deleteAccount: async (password) => {
        set({ loading: true, error: null });
        try {
            await apiDeleteAccount(password);
            localStorage.removeItem('renote_token');
            set({ user: null, token: null, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
            throw err;
        }
    },

    // Conservé pour la compatibilité — le token est déjà initialisé à la création du store.
    initFromStorage: () => {},
}));

export default useAuthStore;