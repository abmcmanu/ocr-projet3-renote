/**
 * NoteCard
 * Design identique à la boucle @foreach du fichier
 * resources/views/livewire/notes.blade.php :
 *
 *   <div class="border p-3 flex justify-between items-start">
 *     <div>
 *       <p>{{ $note->text }}</p>
 *       <small class="text-gray-500">Tag: {{ $note->tag->name ?? '—' }}</small>
 *     </div>
 *     <button wire:click="delete(…)" class="text-red-500 text-sm">Delete</button>
 *   </div>
 *
 * Props :
 *   note     { id, text, tag: { name }, created_at }
 *   onDelete (id) => void
 */
export default function NoteCard({ note, onDelete }) {
  return (
    <div className="border p-3 flex justify-between items-start">
      <div>
        <p>{note.text}</p>
        <small className="text-gray-500">
          Tag: {note.tag?.name ?? '—'}
        </small>
        {note.created_at && (
          <>
            {' · '}
            <small className="text-gray-400">
              {new Date(note.created_at).toLocaleDateString('fr-FR')}
            </small>
          </>
        )}
      </div>
      <button
        className="text-red-500 text-sm"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
}
