import { Note, UpdateNoteData } from '@/types/note'
import { NoteCard } from './note-card'

interface NotesGridProps {
  notes: Note[]
  onUpdate: (id: string, data: UpdateNoteData) => Promise<void>
  onDelete: (id: string) => Promise<void>
  loading?: boolean
}

export function NotesGrid({ notes, onUpdate, onDelete, loading }: NotesGridProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
        <p className="text-muted-foreground">
          Create your first note to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
          loading={loading}
        />
      ))}
    </div>
  )
}