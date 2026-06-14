<script lang="ts">
  import { goto } from '$app/navigation'
  import { IconsGallery } from '@oshiage/design-system'
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { EVENT_TYPE_OPTIONS, EVENT_TYPE_LABELS } from '@pages/events/config/eventsPageConfig'
  import { ROUTES } from '@shared/routes'

  let {
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

  function formatDate(dateStr: string, endDateStr?: string | null) {
    const start = new Date(dateStr)
    const opts: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }
    if (!endDateStr) return start.toLocaleDateString('ja-JP', opts)
    const end = new Date(endDateStr)
    const startFmt = start.toLocaleDateString('ja-JP', opts)
    const endFmt = end.toLocaleDateString('ja-JP', opts)
    return `${startFmt} 〜 ${endFmt}`
  }

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
</script>

<svelte:head>
  <title>イベント一覧 | 推しアゲ</title>
  <meta
    name="description"
    content="男子新体操の大会・発表会・練習会など、各種イベント情報を一覧で確認できます。"
  />
</svelte:head>

<div class="events-page">
  <!-- ページヘッダー -->
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">イベント一覧</h1>
      <p class="page-desc">男子新体操に関するイベント情報を検索・閲覧できます。</p>
    </div>
  </div>

  <div class="page-body">
    <!-- フィルター -->
    <div class="filters">
      <div class="filter-group">
        <label class="filter-label" for="event-type">種別</label>
        <select
          id="event-type"
          class="filter-select"
          bind:value={selectedType}
          onchange={applyFilter}
        >
          {#each EVENT_TYPE_OPTIONS as opt, index (index)}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- 件数 -->
    <p class="result-count">
      {total} 件のイベント
    </p>

    <!-- イベント一覧 -->
    {#if events.length === 0}
      <div class="empty-state">
        <IconsGallery name="calendar" size={48} color="gray" />
        <p class="empty-title">イベントが見つかりませんでした</p>
        <p class="empty-desc">フィルターを変えてお試しください。</p>
      </div>
    {:else}
      <div class="events-grid">
        {#each events as event (event.id)}
          <a href={ROUTES.events.detail(String(event.id))} class="event-card">
            <div class="event-card-header">
              <span class="event-type-badge"
                >{EVENT_TYPE_LABELS[event.eventType] ?? event.eventType}</span
              >
              {#if event.fee}
                <span class="event-fee">¥{event.fee.toLocaleString()}</span>
              {/if}
            </div>
            <h2 class="event-title">{event.title}</h2>
            <div class="event-meta">
              <span class="event-meta-item">
                <IconsGallery name="calendar" size={14} color="gray" />
                {formatDate(event.startAt, event.endAt)}
              </span>
              <span class="event-meta-item">
                <IconsGallery name="mapPin" size={14} color="gray" />
                {event.place}
              </span>
            </div>
            {#if event.description}
              <p class="event-description">{event.description}</p>
            {/if}
          </a>
        {/each}
      </div>

      <!-- ページネーション -->
      {#if totalPages > 1}
        <div class="pagination">
          <button
            class="pagination-btn"
            type="button"
            disabled={page <= 1}
            onclick={() => changePage(page - 1)}
            aria-label="前のページ"
          >
            <IconsGallery name="chevronLeft" size={16} color="gray" />
          </button>
          <span class="pagination-info">{page} / {totalPages}</span>
          <button
            class="pagination-btn"
            type="button"
            disabled={page >= totalPages}
            onclick={() => changePage(page + 1)}
            aria-label="次のページ"
          >
            <IconsGallery name="chevronRight" size={16} color="gray" />
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .events-page {
    min-height: 100%;
  }

  .page-header {
    padding: 40px 16px;
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($indigo, 100)});
    border-bottom: 1px solid map.get($border, default);
  }

  .page-header-inner {
    max-width: $container-max;
    place-self: center;
  }

  .page-title {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .page-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
  }

  .page-body {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }

  .filters {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .filter-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .filter-select {
    padding: 8px 32px 8px 12px;
    font-size: map.get($font-size, sm);
    color: map.get($text, primary);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: map.get($border, focus);
      box-shadow: 0 0 0 3px #{map.get($indigo, 100)};
    }
  }

  .result-count {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 80px 16px;
    text-align: center;
    color: map.get($text, muted);
  }

  .empty-title {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, secondary);
  }

  .empty-desc {
    font-size: map.get($font-size, sm);
  }

  .events-grid {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get($breakpoint, lg)}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .event-card {
    display: block;
    padding: 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
    transition:
      border-color map.get($transition, base),
      box-shadow map.get($transition, base),
      transform map.get($transition, base);
    text-decoration: none;

    &:hover {
      border-color: rgb(79, 70, 229, 0.3);
      box-shadow: map.get($shadow, lg);
      transform: translateY(-2px);
    }
  }

  .event-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .event-type-badge {
    display: inline-block;
    padding: 3.2px 10px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    color: map.get($indigo, 600);
    border-radius: map.get($radius, full);
    background: map.get($indigo, 100);
  }

  .event-fee {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .event-title {
    display: -webkit-box;
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    transition: color map.get($transition, fast);
    line-height: map.get($line-height, snug);
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    .event-card:hover & {
      color: map.get($indigo, 500);
    }
  }

  .event-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .event-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .event-description {
    display: -webkit-box;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .pagination-btn {
    display: flex;
    width: 36px;
    height: 36px;
    color: map.get($text, muted);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    transition:
      background map.get($transition, fast),
      color map.get($transition, fast);
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover:not(:disabled) {
      color: map.get($text, primary);
      background: map.get($bg, muted);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .pagination-info {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }
</style>
