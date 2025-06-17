<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { darkMode } from '../lib/stores';
  import { toggleTheme } from '../lib/theme';
  import Button from './Button.svelte';
</script>

<Button variant="outline" size="icon" on:click={toggleTheme}>
  {#if $darkMode}
    <Sun class="h-4 w-4" />
  {:else}
    <Moon class="h-4 w-4" />
  {/if}
  <span class="sr-only">Toggle theme</span>
</Button>