import { writable } from 'svelte/store';
import type { Note } from './types';

export const notes = writable<Note[]>([]);
export const loading = writable<boolean>(false);
export const error = writable<string | null>(null);
export const darkMode = writable<boolean>(true);

// Toast store
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const toasts = writable<Toast[]>([]);

export function addToast(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { ...toast, id };
  
  toasts.update(current => [...current, newToast]);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(id);
  }, 5000);
  
  return id;
}

export function removeToast(id: string) {
  toasts.update(current => current.filter(toast => toast.id !== id));
}