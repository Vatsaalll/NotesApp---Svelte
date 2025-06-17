<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import Button from './Button.svelte';
  
  export let currentPage: number;
  export let totalPages: number;
  export let totalItems: number;
  export let itemsPerPage: number;
  
  const dispatch = createEventDispatcher<{
    pageChange: number;
  }>();
  
  $: startItem = (currentPage - 1) * itemsPerPage + 1;
  $: endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch('pageChange', page);
    }
  }
  
  function goToPrevious() {
    goToPage(currentPage - 1);
  }
  
  function goToNext() {
    goToPage(currentPage + 1);
  }
  
  // Generate page numbers to show
  $: pageNumbers = (() => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  })();
</script>

{#if totalPages > 1}
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
    <!-- Items info -->
    <div class="text-sm text-muted-foreground-DEFAULT dark:text-muted-foreground-dark">
      Showing {startItem}-{endItem} of {totalItems} notes
    </div>
    
    <!-- Pagination controls -->
    <div class="flex items-center gap-2">
      <!-- Previous button -->
      <Button
        variant="outline"
        size="sm"
        on:click={goToPrevious}
        disabled={currentPage === 1}
        class="flex items-center gap-1"
      >
        <ChevronLeft class="h-4 w-4" />
        Previous
      </Button>
      
      <!-- Page numbers -->
      <div class="flex items-center gap-1">
        {#each pageNumbers as pageNum}
          <Button
            variant={pageNum === currentPage ? 'default' : 'outline'}
            size="sm"
            on:click={() => goToPage(pageNum)}
            class="min-w-[2.5rem] {pageNum === currentPage ? 'shadow-md' : ''}"
          >
            {pageNum}
          </Button>
        {/each}
      </div>
      
      <!-- Next button -->
      <Button
        variant="outline"
        size="sm"
        on:click={goToNext}
        disabled={currentPage === totalPages}
        class="flex items-center gap-1"
      >
        Next
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
{/if}