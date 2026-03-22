/**
 * NoteList
 * Reproduit la section liste de notes.blade.php :
 *
 *   <hr>
 *   <h2 class="text-xl font-bold">Your Notes</h2>
 *   @foreach ($notes as $note)
 *     <NoteCard … />
 *   @endforeach
 *
 * Le <hr> et le titre "Your Notes" font partie de cette section
 * pour rester fidèle au rendu original.
 *
 * Props :
 *   notes    Note[]
 *   onDelete (id) => void
 */
import NoteCard from './NoteCard';

export default function NoteList({ notes, onDelete }) {
  return (
    <>
      <hr />

      <h2 className="text-xl font-bold">Your Notes</h2>

      {notes.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucune note pour l&apos;instant.</p>
      ) : (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={onDelete} />
        ))
      )}
    </>
  );
}
