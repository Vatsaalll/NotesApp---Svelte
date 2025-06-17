<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Search, X } from 'lucide-svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  
  export let value = '';
  export let placeholder = 'Search notes...';
  
  const dispatch = createEventDispatcher<{
    search: string;
    clear: void;
  }>();
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('search', value);
  }
  
  function handleClear() {
    value = '';
    dispatch('clear');
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleClear();
    }
  }
</script>

<div class="relative w-full">
  <div class="relative">
    <div class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
      <Search class="h-4 w-4 text-muted-foreground-DEFAULT dark:text-muted-foreground-dark" />
    </div>
    <Input
      bind:value
      {placeholder}
      className="pl-10 {value ? 'pr-10' : 'pr-4'} border-2 h-12 text-base"
      on:input={handleInput}
      on:keydown={handleKeydown}
    />
    {#if value}
      <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          on:click={handleClear}
          class="h-8 w-8 hover:bg-muted-DEFAULT dark:hover:bg-muted-dark"
        >
          <X class="h-4 w-4" />
        </Button>
      </div>
    {/if}
  </div>
</div>