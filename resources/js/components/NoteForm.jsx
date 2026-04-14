/**
 * NoteForm
 * Reproduit exactement le <form> de notes.blade.php :
 *
 *   <form wire:submit.prevent="save" class="space-y-2">
 *     <textarea … class="w-full border p-2" placeholder="Write your note…"/>
 *     <select … class="w-full border p-2">
 *       <option value="">-- Select Tag --</option>
 *       @foreach ($tags as $tag) …
 *     </select>
 *     <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Note</button>
 *   </form>
 *
 * Props :
 *   tags      Tag[]   — liste { id, name }
 *   onSubmit  ({ tag_id, text }) => void
 *   loading   boolean
 *   message   string|null  — message de succès (équivalent session('message'))
 */
import { useState } from 'react';

export default function NoteForm({ tags = [], onSubmit, loading = false, message = null }) {
  const [text, setText]   = useState('');
  const [tagId, setTagId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !tagId) return;
    onSubmit({ tag_id: tagId, text });
    // Réinitialisation identique à $this->text = ''; $this->tag_id = '';
    setText('');
    setTagId('');
  }

  return (
    <div className="space-y-4">
      {/* Équivalent @if (session()->has('message')) */}
      {message && (
        <div className="text-green-600">{message}</div>
      )}

      <form className="space-y-2" onSubmit={handleSubmit}>
        <textarea
          className="w-full border dark:border-zinc-700 bg-white dark:bg-zinc-900 dark:text-white p-2 placeholder-zinc-400 dark:placeholder-zinc-500"
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        <select
          className="w-full border dark:border-zinc-700 bg-white dark:bg-zinc-900 dark:text-white p-2"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
        >
          <option value="">-- Select Tag --</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Ajout…' : 'Add Note'}
        </button>
      </form>
    </div>
  );
}
