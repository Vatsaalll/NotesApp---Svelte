<script lang="ts">
  import { onMount } from 'svelte';
  import { RefreshCw, BookOpen } from 'lucide-svelte';
  import { notes, loading, error } from './lib/stores';
  import { notesApi } from './lib/api';
  import { addToast } from './lib/stores';
  import { initializeTheme } from './lib/theme';
  import type { CreateNoteData, UpdateNoteData, Note } from './lib/types';
  
  import Button from './components/Button.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import NoteForm from './components/NoteForm.svelte';
  import NotesGrid from './components/NotesGrid.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import Pagination from './components/Pagination.svelte';
  import Toast from './components/Toast.svelte';
  
  let searchQuery = '';
  let filteredNotes: Note[] = [];
  let currentPage = 1;
  const itemsPerPage = 20;
  
  // Pagination calculations
  $: totalItems = filteredNotes.length;
  $: totalPages = Math.ceil(totalItems / itemsPerPage);
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  $: paginatedNotes = filteredNotes.slice(startIndex, endIndex);
  
  // Update filtered notes when notes or search query changes
  $: {
    if (searchQuery.trim()) {
      filteredNotes = $notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredNotes = $notes;
    }
    // Reset to first page when search changes
    currentPage = 1;
  }
  
  onMount(() => {
    initializeTheme();
    fetchNotes();
  });
  
  async function fetchNotes() {
    try {
      $loading = true;
      $error = null;
      const fetchedNotes = await notesApi.getAll();
      $notes = fetchedNotes.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (err) {
      const errorMessage = 'Failed to fetch notes';
      $error = errorMessage;
      addToast({
        type: 'error',
        title: 'Error',
        description: errorMessage
      });
    } finally {
      $loading = false;
    }
  }
  
  async function createNote(event: CustomEvent<CreateNoteData>) {
    try {
      $loading = true;
      const newNote = await notesApi.create(event.detail);
      $notes = [newNote, ...$notes];
      addToast({
        type: 'success',
        title: 'Success',
        description: 'Note created successfully'
      });
    } catch (err) {
      const errorMessage = 'Failed to create note';
      addToast({
        type: 'error',
        title: 'Error',
        description: errorMessage
      });
    } finally {
      $loading = false;
    }
  }
  
  async function updateNote(event: CustomEvent<{ id: string; data: UpdateNoteData }>) {
    try {
      $loading = true;
      const { id, data } = event.detail;
      const updatedNote = await notesApi.update(id, data);
      $notes = $notes.map(note => note.id === id ? updatedNote : note);
      addToast({
        type: 'success',
        title: 'Success',
        description: 'Note updated successfully'
      });
    } catch (err) {
      const errorMessage = 'Failed to update note';
      addToast({
        type: 'error',
        title: 'Error',
        description: errorMessage
      });
    } finally {
      $loading = false;
    }
  }
  
  async function deleteNote(event: CustomEvent<string>) {
    try {
      $loading = true;
      const id = event.detail;
      await notesApi.delete(id);
      $notes = $notes.filter(note => note.id !== id);
      addToast({
        type: 'success',
        title: 'Success',
        description: 'Note deleted successfully'
      });
    } catch (err) {
      const errorMessage = 'Failed to delete note';
      addToast({
        type: 'error',
        title: 'Error',
        description: errorMessage
      });
    } finally {
      $loading = false;
    }
  }
  
  function handleRefresh() {
    fetchNotes();
  }
  
  function handleSearch(event: CustomEvent<string>) {
    searchQuery = event.detail;
  }
  
  function handleClearSearch() {
    searchQuery = '';
  }
  
  function handlePageChange(event: CustomEvent<number>) {
    currentPage = event.detail;
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="min-h-screen bg-background-DEFAULT dark:bg-background-dark transition-colors">
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-primary-DEFAULT dark:bg-primary-dark rounded-xl border-2 border-primary-DEFAULT dark:border-primary-dark shadow-lg">
          <BookOpen class="h-7 w-7 text-primary-foreground-DEFAULT dark:text-primary-foreground-dark" />
        </div>
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-foreground-DEFAULT dark:text-foreground-dark">
            My Notes
          </h1>
          <p class="text-muted-foreground-DEFAULT dark:text-muted-foreground-dark">
            Capture your thoughts and organize your ideas
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          on:click={handleRefresh}
          disabled={$loading}
        >
          <RefreshCw class="h-4 w-4 {$loading ? 'animate-spin' : ''}" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
    
    <!-- Search Bar -->
    <div class="mb-8">
      <SearchBar
        bind:value={searchQuery}
        on:search={handleSearch}
        on:clear={handleClearSearch}
      />
    </div>
    
    <!-- Action Bar -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <NoteForm loading={$loading} on:submit={createNote} />
        {#if searchQuery.trim()}
          <p class="text-sm text-muted-foreground-DEFAULT dark:text-muted-foreground-dark">
            {filteredNotes.length} result{filteredNotes.length === 1 ? '' : 's'} for "{searchQuery}"
          </p>
        {/if}
      </div>
    </div>
    
    <!-- Error State -->
    {#if $error}
      <div class="bg-destructive-DEFAULT/10 dark:bg-destructive-dark/10 border-2 border-destructive-DEFAULT/20 dark:border-destructive-dark/20 rounded-lg p-4 mb-6 animate-fade-in shadow-md">
        <p class="text-destructive-DEFAULT dark:text-destructive-dark text-sm">{$error}</p>
        <Button
          variant="outline"
          size="sm"
          on:click={handleRefresh}
          class="mt-2"
        >
          Retry
        </Button>
      </div>
    {/if}
    
    <!-- Loading State -->
    {#if $loading && $notes.length === 0}
      <div class="flex items-center justify-center py-16 animate-fade-in">
        <div class="flex items-center gap-3 text-muted-foreground-DEFAULT dark:text-muted-foreground-dark">
          <RefreshCw class="h-6 w-6 animate-spin" />
          <span class="text-lg">Loading notes...</span>
        </div>
      </div>
    {/if}
    
    <!-- Notes Grid -->
    {#if !$loading || $notes.length > 0}
      <NotesGrid
        notes={paginatedNotes}
        loading={$loading}
        on:update={updateNote}
        on:delete={deleteNote}
      />
      
      <!-- Pagination -->
      {#if filteredNotes.length > 0}
        <Pagination
          {currentPage}
          {totalPages}
          totalItems={filteredNotes.length}
          {itemsPerPage}
          on:pageChange={handlePageChange}
        />
      {/if}
    {/if}
  </div>
  
  <Toast />
</div>