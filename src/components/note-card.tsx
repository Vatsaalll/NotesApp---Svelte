import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Edit3, Trash2, Save, X } from 'lucide-react'
import { Note, UpdateNoteData } from '@/types/note'
import { formatDistanceToNow } from 'date-fns'

interface NoteCardProps {
  note: Note
  onUpdate: (id: string, data: UpdateNoteData) => Promise<void>
  onDelete: (id: string) => Promise<void>
  loading?: boolean
}

export function NoteCard({ note, onUpdate, onDelete, loading }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleEdit = () => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return

    try {
      setUpdating(true)
      await onUpdate(note.id, { title: title.trim(), content: content.trim() })
      setIsEditing(false)
    } catch (err) {
      // Error handling is done in the hook
    } finally {
      setUpdating(false)
    }
  }

  const handleCancel = () => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await onDelete(note.id)
    } catch (err) {
      // Error handling is done in the hook
    } finally {
      setDeleting(false)
    }
  }

  const formattedDate = formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })

  if (isEditing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            disabled={updating}
            className="text-lg font-semibold"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content..."
            disabled={updating}
            rows={4}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim() || updating}
              size="sm"
            >
              <Save className="h-4 w-4 mr-1" />
              {updating ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={updating}
              size="sm"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full group hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">
            {note.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              disabled={loading}
              className="h-8 w-8"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={loading || deleting}
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{note.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed whitespace-pre-wrap line-clamp-4">
          {note.content}
        </p>
      </CardContent>
    </Card>
  )
}