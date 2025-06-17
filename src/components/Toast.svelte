<script lang="ts">
  import { toasts, removeToast } from '../lib/stores';
  import { X, CheckCircle, AlertCircle, Info } from 'lucide-svelte';
  import Button from './Button.svelte';
  
  $: iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };
  
  $: colorMap = {
    success: 'border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100',
    error: 'border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100',
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100'
  };
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
  {#each $toasts as toast (toast.id)}
    <div class="animate-slide-in max-w-sm w-full bg-background-DEFAULT dark:bg-background-dark border border-border-DEFAULT dark:border-border-dark rounded-lg shadow-lg p-4 {colorMap[toast.type]}">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svelte:component this={iconMap[toast.type]} class="h-5 w-5" />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium">
            {toast.title}
          </p>
          {#if toast.description}
            <p class="mt-1 text-sm opacity-90">
              {toast.description}
            </p>
          {/if}
        </div>
        <div class="ml-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            on:click={() => removeToast(toast.id)}
            class="h-6 w-6"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  {/each}
</div>