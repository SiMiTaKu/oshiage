<script lang="ts">
  import { goto } from '$app/navigation'
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { META_DATA } from '@shared/config/meta'
  import { EventsHeader, EventsFilter, EventsGrid } from '@widgets/events'

  const {
    events,
    total,
    page,
    eventType,
  }: {
    events: EventResponseDto[]
    total: number
    page: number
    eventType: string
  } = $props()

  let selectedType = $state('')

  $effect(() => {
    selectedType = eventType ?? ''
  })

  function applyFilter() {
    const params = new URLSearchParams()
    if (selectedType) params.set('type', selectedType)
    params.set('page', '1')
    goto(`/events?${params.toString()}`)
  }

  function changePage(p: number) {
    const params = new URLSearchParams()
    if (selectedType) params.set('type', selectedType)
    params.set('page', String(p))
    goto(`/events?${params.toString()}`)
  }

  const totalPages = $derived(Math.ceil(total / 20))
  const meta = META_DATA.events
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="events-page">
  <EventsHeader />

  <div class="page-body">
    <EventsFilter bind:selectedType onchange={applyFilter} />
    <EventsGrid {events}
{total}
{page}
{totalPages}
onPageChange={changePage} />
  </div>
</div>

<style lang="scss">
  @use 'index' as *;

  .events-page {
    min-height: 100%;
  }

  .page-body {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }
</style>
