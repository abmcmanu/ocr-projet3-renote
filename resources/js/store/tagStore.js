import { create } from 'zustand';
import { getTags, createTag as apiCreateTag } from '../services/tagService';

const useTagStore = create((set) => ({
    tags: [],
    loading: false,
    error: null,

    fetchTags: async () => {
        set({ loading: true, error: null });
        try {
            const tags = await getTags();
            set({ tags, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },

    createTag: async (name) => {
        set({ loading: true, error: null });
        try {
            const tag = await apiCreateTag(name);
            set((state) => ({ tags: [tag, ...state.tags], loading: false }));
        } catch (err) {
            set({ error: err.response?.data?.message ?? err.message, loading: false });
        }
    },
}));

export default useTagStore;