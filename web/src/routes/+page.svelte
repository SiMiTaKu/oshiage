<script lang="ts">
  import AppProviders from '../app/providers/app-providers.svelte'
  import HomePage from '../pages/home/ui/home-page.svelte'
</script>

<svelte:head>
  <title>推しアゲ | MVP Web</title>
</svelte:head>

<AppProviders>
  <HomePage />
</AppProviders>
