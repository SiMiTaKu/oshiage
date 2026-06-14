<script lang="ts">
  import { page } from '$app/stores'
  import HeaderPC from './HeaderPC.svelte'
  import HeaderSP from './HeaderSP.svelte'
</script>

{#if $page.data.isMobile}
  <HeaderSP />
{:else}
  <HeaderPC />
{/if}
