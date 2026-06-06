<script lang="ts">
  import { goto } from '$app/navigation'
  import {
    CalendarIcon,
    MapPinIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  } from '@oshiage/design-system'
  import type { EventResponseDto } from '../../../shared/api/generated/client'
  import {
    EVENT_TYPE_OPTIONS,
    EVENT_TYPE_LABELS,
    EVENTS_BREADCRUMB_HREF,
  } from '../config/eventsPageConfig'
  import { ROUTES } from '../../../shared/routes'

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
        <CalendarIcon size={48} color="gray" />
        <p class="empty-title">イベントが見つかりませんでした</p>
        <p class="empty-desc">フィルターを変えてお試しください。</p>
      </div>
    {:else}
      <div class="events-grid">
        {#each events as event (event.id)}
          <a href={ROUTES.events.detail(event.id)} class="event-card">
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
                <CalendarIcon size={14} color="gray" />
                {formatDate(event.startAt, event.endAt)}
              </span>
              <span class="event-meta-item">
                <MapPinIcon size={14} color="gray" />
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
            <ChevronLeftIcon size={16} color="gray" />
          </button>
          <span class="pagination-info">{page} / {totalPages}</span>
          <button
            class="pagination-btn"
            type="button"
            disabled={page >= totalPages}
            onclick={() => changePage(page + 1)}
            aria-label="次のページ"
          >
            <ChevronRightIcon size={16} color="gray" />
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
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($indigo, 100)});
    border-bottom: 1px solid map.get($border, default);
    padding: 2.5rem 1rem;
  }

  .page-header-inner {
    max-width: $container-max;
    margin: 0 auto;
  }

  .page-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    margin: 0 0 0.5rem;
  }

  .page-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
    margin: 0;
  }

  .page-body {
    max-width: $container-max;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .filter-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .filter-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    font-size: map.get($font-size, sm);
    background: map.get($bg, surface);
    color: map.get($text, primary);
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
    margin-bottom: 1.5rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 5rem 1rem;
    text-align: center;
    color: map.get($text, muted);
  }

  .empty-title {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, secondary);
    margin: 0;
  }

  .empty-desc {
    font-size: map.get($font-size, sm);
    margin: 0;
  }

  .events-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get($breakpoint, lg)}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .event-card {
    display: block;
    padding: 1.5rem;
    background: map.get($bg, surface);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    text-decoration: none;
    transition:
      border-color map.get($transition, base),
      box-shadow map.get($transition, base),
      transform map.get($transition, base);

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
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .event-type-badge {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    background: map.get($indigo, 100);
    color: map.get($indigo, 600);
    border-radius: map.get($radius, full);
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
  }

  .event-fee {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .event-title {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    margin: 0 0 0.75rem;
    line-height: map.get($line-height, snug);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color map.get($transition, fast);

    .event-card:hover & {
      color: map.get($indigo, 500);
    }
  }

  .event-meta {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .event-meta-item {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .event-description {
    margin: 0.75rem 0 0;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    cursor: pointer;
    color: map.get($text, muted);
    transition:
      background map.get($transition, fast),
      color map.get($transition, fast);

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
