import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { PlusCircle, X } from 'lucide-react'
import { CreateNoteData } from '@/types/note'

interface NoteFormProps {
  onSubmit: (data: CreateNoteData) => Promise<void>
  loading?: boolean
}

export function NoteForm({ onSubmit, loading }: NoteFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    try {
      setSubmitting(true)
      await onSubmit({ title: title.trim(), content: content.trim() })
      setTitle('')
      setContent('')
      setIsOpen(false)
    } catch (err) {
      // Error handling is done in the hook
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto"
        size="lg"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add New Note
      </Button>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Create New Note</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          disabled={submitting}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              required
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content..."
              required
              disabled={submitting}
              rows={4}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={!title.trim() || !content.trim() || submitting}
              className="flex-1 sm:flex-initial"
            >
              {submitting ? 'Creating...' : 'Create Note'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}