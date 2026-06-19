<script lang="ts">
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { META_DATA } from '@shared/config/meta'
  import { EventDetailHeader, EventDetailContent } from '@widgets/events'

  const { event }: { event: EventResponseDto } = $props()
  const meta = $derived(META_DATA.eventDetail(event.title))
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="event-detail-page">
  <EventDetailHeader {event} />
  <div class="page-content">
    <EventDetailContent {event} />
  </div>
</div>

<style lang="scss">
  @use 'index' as *;

  .event-detail-page {
    min-height: 100%;
  }

  .page-content {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }
</style>
