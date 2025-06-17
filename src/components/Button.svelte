<script lang="ts">
  export let variant: 'default' | 'outline' | 'ghost' | 'destructive' = 'default';
  export let size: 'sm' | 'md' | 'lg' | 'icon' = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  
  $: baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  $: variantClasses = {
    default: 'bg-primary-DEFAULT dark:bg-primary-dark text-primary-foreground-DEFAULT dark:text-primary-foreground-dark hover:bg-primary-DEFAULT/90 dark:hover:bg-primary-dark/90 border-2 border-primary-DEFAULT dark:border-primary-dark shadow-sm hover:shadow-md',
    outline: 'border-2 border-border-DEFAULT dark:border-border-dark bg-background-DEFAULT dark:bg-background-dark hover:bg-accent-DEFAULT dark:hover:bg-accent-dark hover:text-accent-foreground-DEFAULT dark:hover:text-accent-foreground-dark shadow-sm hover:shadow-md',
    ghost: 'hover:bg-accent-DEFAULT dark:hover:bg-accent-dark hover:text-accent-foreground-DEFAULT dark:hover:text-accent-foreground-dark',
    destructive: 'bg-destructive-DEFAULT dark:bg-destructive-dark text-destructive-foreground-DEFAULT dark:text-destructive-foreground-dark hover:bg-destructive-DEFAULT/90 dark:hover:bg-destructive-dark/90 border-2 border-destructive-DEFAULT dark:border-destructive-dark shadow-sm hover:shadow-md'
  };
  
  $: sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10'
  };
</script>

<button
  {type}
  {disabled}
  class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}"
  on:click
>
  <slot />
</button>