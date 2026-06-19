<script lang="ts">
  import { META_DATA } from '@shared/config/meta'
  import { MainVisual, Features, EventPreview, AthletePreview, CallToAction } from '@widgets/home'

  const meta = META_DATA.home
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
  {#if meta.ogTitle}
    <meta property="og:title" content={meta.ogTitle} />
  {/if}
  {#if meta.ogDescription}
    <meta property="og:description" content={meta.ogDescription} />
  {/if}
  {#if meta.ogType}
    <meta property="og:type" content={meta.ogType} />
  {/if}
  {#if meta.twitterCard}
    <meta name="twitter:card" content={meta.twitterCard} />
  {/if}
</svelte:head>

<MainVisual />
<Features />
<EventPreview />
<AthletePreview />
<CallToAction />
