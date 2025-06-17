import { Note, CreateNoteData, UpdateNoteData } from '@/types/note'

// Replace with your actual mockapi.io endpoint
const API_BASE_URL = 'https://65f8a8e1df1515197416088c.mockapi.io/api/v1'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const notesApi = {
  async getAll(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`)
    return handleResponse<Note[]>(response)
  },

  async create(data: CreateNoteData): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<Note>(response)
  },

  async update(id: string, data: UpdateNoteData): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<Note>(response)
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }
  },
}