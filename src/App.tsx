import { useEffect } from 'react'
import { useNotes } from '@/hooks/use-notes'
import { NoteForm } from '@/components/note-form'
import { NotesGrid } from '@/components/notes-grid'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { RefreshCw, BookOpen } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote } = useNotes()

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleRefresh = () => {
    fetchNotes()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
              <p className="text-muted-foreground">
                Capture your thoughts and organize your ideas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Create Note Form */}
        <div className="mb-8">
          <NoteForm onSubmit={createNote} loading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && notes.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Loading notes...</span>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {!loading || notes.length > 0 ? (
          <NotesGrid
            notes={notes}
            onUpdate={updateNote}
            onDelete={deleteNote}
            loading={loading}
          />
        ) : null}
      </div>
      
      <Toaster />
    </div>
  )
}

export default App