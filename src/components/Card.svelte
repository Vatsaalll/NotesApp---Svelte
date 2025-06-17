<script lang="ts">
  export let className = '';
</script>

<div class="rounded-lg border-2 border-border-DEFAULT dark:border-border-dark bg-card-DEFAULT dark:bg-card-dark text-card-foreground-DEFAULT dark:text-card-foreground-dark shadow-sm hover:shadow-md transition-shadow duration-200 {className}">
  <slot />
</div>