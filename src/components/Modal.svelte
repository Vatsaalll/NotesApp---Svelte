<script lang="ts">
  export let open = false;
  export let title = '';
  export let description = '';
  
  function closeModal() {
    open = false;
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
  
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div 
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="bg-white dark:bg-background-dark rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border-2 border-border-DEFAULT dark:border-border-dark animate-scale-in">
      <div class="p-6">
        {#if title}
          <h2 id="modal-title" class="text-xl font-semibold text-foreground-DEFAULT dark:text-foreground-dark mb-2">
            {title}
          </h2>
        {/if}
        
        {#if description}
          <p class="text-sm text-muted-foreground-DEFAULT dark:text-muted-foreground-dark mb-6">
            {description}
          </p>
        {/if}
        
        <slot />
      </div>
    </div>
  </div>
{/if}