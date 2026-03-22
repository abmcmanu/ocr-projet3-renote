import { create } from 'zustand';
import { getNotes, createNote as apiCreateNote, deleteNote as apiDeleteNote } from '../services/noteService';

const useNoteStore = create((set) => ({
    notes: [],
    loading: false,
    error: null,

    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const notes = await getNotes();
            set({ notes, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },

    createNote: async (tag_id, text) => {
        set({ loading: true, error: null });
        try {
            const note = await apiCreateNote(tag_id, text);
            set((state) => ({ notes: [note, ...state.notes], loading: false }));
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },

    deleteNote: async (id) => {
        set({ loading: true, error: null });
        try {
            await apiDeleteNote(id);
            set((state) => ({ notes: state.notes.filter((n) => n.id !== id), loading: false }));
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },
}));

export default useNoteStore;