<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { PlusCircle, X } from 'lucide-svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import Textarea from './Textarea.svelte';
  import Modal from './Modal.svelte';
  import type { CreateNoteData } from '../lib/types';
  
  export let loading = false;
  
  const dispatch = createEventDispatcher<{
    submit: CreateNoteData;
  }>();
  
  let isOpen = false;
  let title = '';
  let content = '';
  let submitting = false;
  
  function openForm() {
    isOpen = true;
  }
  
  function closeForm() {
    title = '';
    content = '';
    isOpen = false;
  }
  
  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    try {
      submitting = true;
      dispatch('submit', { 
        title: title.trim(), 
        content: content.trim() 
      });
      
      // Reset form
      title = '';
      content = '';
      isOpen = false;
    } catch (err) {
      // Error handling is done in parent component
    } finally {
      submitting = false;
    }
  }
</script>

<Button on:click={openForm} class="w-full sm:w-auto shadow-md hover:shadow-lg" size="lg">
  <PlusCircle class="h-4 w-4 mr-2" />
  Add New Note
</Button>

<Modal bind:open={isOpen} title="Create New Note" description="Add a new note to your collection">
  <form on:submit={handleSubmit} class="space-y-6">
    <div class="space-y-2">
      <label for="title" class="text-sm font-medium text-foreground-DEFAULT dark:text-foreground-dark">
        Title
      </label>
      <Input
        id="title"
        bind:value={title}
        placeholder="Enter note title..."
        required
        disabled={submitting}
        className="border-2"
      />
    </div>
    
    <div class="space-y-2">
      <label for="content" class="text-sm font-medium text-foreground-DEFAULT dark:text-foreground-dark">
        Content
      </label>
      <Textarea
        id="content"
        bind:value={content}
        placeholder="Write your note content..."
        required
        disabled={submitting}
        rows={6}
        className="border-2"
      />
    </div>
    
    <div class="flex gap-3 justify-end pt-4 border-t border-border-DEFAULT dark:border-border-dark">
      <Button
        type="button"
        variant="outline"
        on:click={closeForm}
        disabled={submitting}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={!title.trim() || !content.trim() || submitting}
      >
        {submitting ? 'Creating...' : 'Create Note'}
      </Button>
    </div>
  </form>
</Modal>