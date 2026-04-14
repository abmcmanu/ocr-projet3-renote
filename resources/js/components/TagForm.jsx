/**
 * TagForm
 * Reproduit exactement tag-form.blade.php :
 *
 *   <div class="space-y-4">
 *     <h2 class="text-xl font-bold">Add a tag</h2>
 *     <form wire:submit.prevent="save" class="space-y-2">
 *       <input type="text" … class="border rounded px-3 py-1 text-sm w-full" />
 *       <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Tag</button>
 *     </form>
 *     @error('name') <div class="text-red-500 text-xs">…</div> @enderror
 *   </div>
 *
 * Props :
 *   onSubmit  ({ name }) => void
 *   loading   boolean
 *   message   string|null  — message de succès (équivalent session('message'))
 *   error     string|null  — erreur de validation (équivalent @error('name'))
 */
import { useState } from 'react';

export default function TagForm({ onSubmit, loading = false, message = null, error = null }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name });
    // Réinitialisation identique à $this->reset('name')
    setName('');
  }

  return (
    <div className="space-y-4">
      {/* Équivalent @if (session()->has('message')) */}
      {message && (
        <div className="text-green-600 text-sm">{message}</div>
      )}

      <h2 className="text-xl font-bold">Add a tag</h2>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border dark:border-zinc-700 bg-white dark:bg-zinc-900 dark:text-white rounded px-3 py-1 text-sm w-full placeholder-zinc-400 dark:placeholder-zinc-500"
          placeholder="New tag name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Création…' : 'Add Tag'}
        </button>
      </form>

      {/* Équivalent @error('name') */}
      {error && (
        <div className="text-red-500 text-xs">{error}</div>
      )}
    </div>
  );
}
