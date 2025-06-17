<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { FileEdit as Edit3, Trash2, Save, X } from 'lucide-svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Input from './Input.svelte';
  import Textarea from './Textarea.svelte';
  import Modal from './Modal.svelte';
  import type { Note, UpdateNoteData } from '../lib/types';
  import { formatDate } from '../lib/utils';
  
  export let note: Note;
  export let loading = false;
  
  const dispatch = createEventDispatcher<{
    update: { id: string; data: UpdateNoteData };
    delete: string;
  }>();
  
  let showPreviewModal = false;
  let showEditModal = false;
  let showDeleteModal = false;
  let isHovered = false;
  let title = note.title;
  let content = note.content;
  let updating = false;
  let deleting = false;
  
  $: formattedDate = formatDate(new Date(note.createdAt));
  $: truncatedContent = note.content.length > 120 ? note.content.substring(0, 120) + '...' : note.content;
  
  function handleEdit() {
    title = note.title;
    content = note.content;
    showEditModal = true;
  }
  
  async function handleSave() {
    if (!title.trim() || !content.trim()) return;
    
    try {
      updating = true;
      dispatch('update', {
        id: note.id,
        data: { title: title.trim(), content: content.trim() }
      });
      showEditModal = false;
    } catch (err) {
      // Error handling is done in parent component
    } finally {
      updating = false;
    }
  }
  
  function handleCancel() {
    title = note.title;
    content = note.content;
    showEditModal = false;
  }
  
  async function handleDelete() {
    try {
      deleting = true;
      dispatch('delete', note.id);
      showDeleteModal = false;
    } catch (err) {
      // Error handling is done in parent component
    } finally {
      deleting = false;
    }
  }
  
  function handleCardClick(event: MouseEvent) {
    // Don't show preview if clicking on buttons
    if ((event.target as Element).closest('button')) return;
    showPreviewModal = true;
  }
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<Card 
  className="w-full group transition-all duration-300 cursor-pointer border-2 {isHovered ? 'shadow-xl transform -translate-y-1' : 'hover:shadow-lg'}"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="p-5" on:click={handleCardClick} role="button" tabindex="0">
    <div class="space-y-3">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-semibold leading-tight line-clamp-2 text-foreground-DEFAULT dark:text-foreground-dark pr-2">
          {note.title}
        </h3>
        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" on:click|stopPropagation>
          <Button
            variant="ghost"
            size="icon"
            on:click={handleEdit}
            disabled={loading}
            class="h-8 w-8"
          >
            <Edit3 class="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={loading || deleting}
            on:click={() => showDeleteModal = true}
            class="h-8 w-8 hover:bg-destructive-DEFAULT/10 dark:hover:bg-destructive-dark/10 hover:text-destructive-DEFAULT dark:hover:text-destructive-dark"
          >
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p class="text-sm text-muted-foreground-DEFAULT dark:text-muted-foreground-dark">
        {formattedDate}
      </p>
      
      <p class="text-sm leading-relaxed whitespace-pre-wrap text-foreground-DEFAULT dark:text-foreground-dark">
        {truncatedContent}
      </p>
    </div>
  </div>
</Card>

<!-- Preview Modal -->
<Modal
  bind:open={showPreviewModal}
  title={note.title}
  description={formattedDate}
>
  <div class="max-h-96 overflow-y-auto">
    <p class="text-base leading-relaxed whitespace-pre-wrap text-foreground-DEFAULT dark:text-foreground-dark">
      {note.content}
    </p>
  </div>
  <div class="flex gap-2 justify-end pt-6 border-t border-border-DEFAULT dark:border-border-dark mt-6">
    <Button
      variant="outline"
      on:click={() => showPreviewModal = false}
    >
      Close
    </Button>
    <Button
      on:click={() => {
        showPreviewModal = false;
        handleEdit();
      }}
    >
      <Edit3 class="h-4 w-4 mr-2" />
      Edit Note
    </Button>
  </div>
</Modal>

<!-- Edit Modal -->
<Modal
  bind:open={showEditModal}
  title="Edit Note"
  description="Make changes to your note"
>
  <form on:submit|preventDefault={handleSave} class="space-y-6">
    <div class="space-y-2">
      <label for="edit-title" class="text-sm font-medium text-foreground-DEFAULT dark:text-foreground-dark">
        Title
      </label>
      <Input
        id="edit-title"
        bind:value={title}
        placeholder="Enter note title..."
        required
        disabled={updating}
        className="border-2"
      />
    </div>
    
    <div class="space-y-2">
      <label for="edit-content" class="text-sm font-medium text-foreground-DEFAULT dark:text-foreground-dark">
        Content
      </label>
      <Textarea
        id="edit-content"
        bind:value={content}
        placeholder="Write your note content..."
        required
        disabled={updating}
        rows={6}
        className="border-2"
      />
    </div>
    
    <div class="flex gap-3 justify-end pt-4 border-t border-border-DEFAULT dark:border-border-dark">
      <Button
        type="button"
        variant="outline"
        on:click={handleCancel}
        disabled={updating}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={!title.trim() || !content.trim() || updating}
      >
        <Save class="h-4 w-4 mr-2" />
        {updating ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  </form>
</Modal>

<!-- Delete Confirmation Modal -->
<Modal
  bind:open={showDeleteModal}
  title="Delete Note"
  description='Are you sure you want to delete "{note.title}"? This action cannot be undone.'
>
  <div class="flex gap-2 justify-end pt-4">
    <Button
      variant="outline"
      on:click={() => showDeleteModal = false}
    >
      Cancel
    </Button>
    <Button
      variant="destructive"
      on:click={handleDelete}
      disabled={deleting}
    >
      {deleting ? 'Deleting...' : 'Delete'}
    </Button>
  </div>
</Modal>