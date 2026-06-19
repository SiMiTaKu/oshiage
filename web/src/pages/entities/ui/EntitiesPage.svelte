<script lang="ts">
  import { goto } from '$app/navigation'
  import type { EntityResponseDto } from '@shared/api/generated/client'
  import { META_DATA } from '@shared/config/meta'
  import { EntitiesHeader, EntitiesFilter, EntitiesGrid } from '@widgets/entities'

  const {
    entities,
    total,
    page,
    category,
    activeStatus,
  }: {
    entities: EntityResponseDto[]
    total: number
    page: number
    category: string
    activeStatus: string
  } = $props()

  let selectedCategory = $state('')
  let selectedStatus = $state('')

  $effect(() => {
    selectedCategory = category
    selectedStatus = activeStatus
  })

  function applyFilter() {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedStatus) params.set('status', selectedStatus)
    params.set('page', '1')
    goto(`/entities?${params.toString()}`)
  }

  function changePage(p: number) {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedStatus) params.set('status', selectedStatus)
    params.set('page', String(p))
    goto(`/entities?${params.toString()}`)
  }

  const totalPages = $derived(Math.ceil(total / 20))
  const meta = META_DATA.entities
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="entities-page">
  <EntitiesHeader />

  <div class="page-body">
    <EntitiesFilter bind:selectedCategory bind:selectedStatus onchange={applyFilter} />
    <EntitiesGrid {entities}
{total}
{page}
{totalPages}
onPageChange={changePage} />
  </div>
</div>

<style lang="scss">
  @use 'index' as *;

  .entities-page {
    min-height: 100%;
  }

  .page-body {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }
</style>
