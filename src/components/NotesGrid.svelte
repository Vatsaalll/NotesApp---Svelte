<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import NoteCard from './NoteCard.svelte';
  import type { Note, UpdateNoteData } from '../lib/types';
  
  export let notes: Note[];
  export let loading = false;
  
  const dispatch = createEventDispatcher<{
    update: { id: string; data: UpdateNoteData };
    delete: string;
  }>();
  
  function handleUpdate(event: CustomEvent<{ id: string; data: UpdateNoteData }>) {
    dispatch('update', event.detail);
  }
  
  function handleDelete(event: CustomEvent<string>) {
    dispatch('delete', event.detail);
  }
</script>

{#if notes.length === 0}
  <div class="text-center py-16 animate-fade-in">
    <div class="text-7xl mb-6">📝</div>
    <h3 class="text-xl font-semibold mb-3 text-foreground-DEFAULT dark:text-foreground-dark">
      No notes found
    </h3>
    <p class="text-muted-foreground-DEFAULT dark:text-muted-foreground-dark text-lg">
      Create your first note to get started!
    </p>
  </div>
{:else}
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each notes as note (note.id)}
      <div class="animate-fade-in">
        <NoteCard
          {note}
          {loading}
          on:update={handleUpdate}
          on:delete={handleDelete}
        />
      </div>
    {/each}
  </div>
{/if}