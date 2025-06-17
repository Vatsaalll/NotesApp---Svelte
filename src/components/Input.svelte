<script lang="ts">
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let required = false;
  export let type = 'text';
  export let className = '';

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
  }
</script>

<input
  {type}
  {placeholder}
  {disabled}
  {required}
  {value}
  on:input={handleInput}
  class="flex h-10 w-full rounded-md border-2 border-input-DEFAULT dark:border-input-dark bg-background-DEFAULT dark:bg-background-dark px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground-DEFAULT dark:placeholder:text-muted-foreground-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-DEFAULT dark:focus-visible:ring-ring-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {className}"
  on:input
  on:keydown
/>