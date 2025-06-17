import { useState, useCallback } from 'react'
import { Note, CreateNoteData, UpdateNoteData } from '@/types/note'
import { notesApi } from '@/services/api'
import { toast } from '@/hooks/use-toast'

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedNotes = await notesApi.getAll()
      setNotes(fetchedNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (err) {
      const errorMessage = 'Failed to fetch notes'
      setError(errorMessage)
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const createNote = useCallback(async (data: CreateNoteData) => {
    try {
      setLoading(true)
      const newNote = await notesApi.create(data)
      setNotes(prev => [newNote, ...prev])
      toast({
        title: 'Success',
        description: 'Note created successfully',
      })
      return newNote
    } catch (err) {
      const errorMessage = 'Failed to create note'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateNote = useCallback(async (id: string, data: UpdateNoteData) => {
    try {
      setLoading(true)
      const updatedNote = await notesApi.update(id, data)
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note))
      toast({
        title: 'Success',
        description: 'Note updated successfully',
      })
      return updatedNote
    } catch (err) {
      const errorMessage = 'Failed to update note'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteNote = useCallback(async (id: string) => {
    try {
      setLoading(true)
      await notesApi.delete(id)
      setNotes(prev => prev.filter(note => note.id !== id))
      toast({
        title: 'Success',
        description: 'Note deleted successfully',
      })
    } catch (err) {
      const errorMessage = 'Failed to delete note'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  }
}