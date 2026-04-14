import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import useNoteStore from '../store/noteStore';
import useTagStore from '../store/tagStore';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import TagForm from '../components/TagForm';

export default function DashboardView() {
    const {
        notes, fetchNotes, createNote, deleteNote,
        loading: noteLoading, error: noteError,
    } = useNoteStore();
    const {
        tags, fetchTags, createTag,
        loading: tagLoading, error: tagError,
    } = useTagStore();

    useEffect(() => {
        fetchNotes();
        fetchTags();
    }, []);

    return (
        <AppLayout>
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">

                {/* Card notes — identique à dashboard.blade.php */}
                <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                    <NoteForm
                        tags={tags}
                        onSubmit={({ tag_id, text }) => createNote(tag_id, text)}
                        loading={noteLoading}
                    />
                    {noteError && <p className="mt-2 text-sm text-red-500">{noteError}</p>}
                    <NoteList notes={notes} onDelete={deleteNote} />
                </div>

                {/* Card tag-form */}
                <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                    <TagForm
                        onSubmit={({ name }) => createTag(name)}
                        loading={tagLoading}
                        error={tagError}
                    />
                </div>
            </div>
        </AppLayout>
    );
}