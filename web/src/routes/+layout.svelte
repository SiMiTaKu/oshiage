<script lang="ts">
  import '../lib.css'
  import type { Snippet } from 'svelte'
  import Header from '../shared/ui/header/header.svelte'
  import Footer from '../shared/ui/footer/footer.svelte'

  let { children }: { children: Snippet } = $props()
</script>

<div class="app-shell">
  <Header />
  <main class="app-main">
    {@render children()}
  </main>
  <Footer />
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
