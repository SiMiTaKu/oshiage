<script lang="ts">
  import AppProviders from '../app/providers/AppProviders.svelte'
  import HomePage from '../pages/home/ui/HomePage.svelte'
</script>

<svelte:head>
  <title>推しアゲ | MVP Web</title>
</svelte:head>

<AppProviders>
  <HomePage />
</AppProviders>
