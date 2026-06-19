<script lang="ts">
  import { META_DATA } from '@shared/config/meta'
  import { FaqHeader, FaqList } from '@widgets/faq'

  const meta = META_DATA.faq
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="faq-page">
  <FaqHeader />
  <div class="page-body">
    <FaqList />
  </div>
</div>

<style lang="scss">
  @use 'index' as *;

  .faq-page {
    min-height: 100%;
  }

  .page-body {
    max-width: 800px;
    place-self: center;
    padding: 32px 16px;
  }
</style>
