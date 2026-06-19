<script lang="ts">
  import { goto } from '$app/navigation'
  import type { NoticeResponseDto } from '@shared/api/generated/client'
  import { META_DATA } from '@shared/config/meta'
  import { NoticesHeader, NoticesGrid } from '@widgets/notices'

  const {
    notices,
    total,
    page,
    noticeType,
  }: {
    notices: NoticeResponseDto[]
    total: number
    page: number
    noticeType: string
  } = $props()

  let selectedType = $state('')

  $effect(() => {
    selectedType = noticeType ?? ''
  })

  function applyFilter() {
    const params = new URLSearchParams()
    if (selectedType) params.set('type', selectedType)
    params.set('page', '1')
    goto(`/notices?${params.toString()}`)
  }

  function changePage(p: number) {
    const params = new URLSearchParams()
    if (selectedType) params.set('type', selectedType)
    params.set('page', String(p))
    goto(`/notices?${params.toString()}`)
  }

  const totalPages = $derived(Math.ceil(total / 20))
  const meta = META_DATA.notices
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="notices-page">
  <NoticesHeader />

  <div class="page-body">
    <NoticesGrid
      {notices}
      {total}
      {page}
      {totalPages}
      bind:selectedType
      onTypeChange={applyFilter}
      onPageChange={changePage}
    />
  </div>
</div>

<style lang="scss">
  @use 'index' as *;

  .notices-page {
    min-height: 100%;
  }

  .page-body {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }
</style>
