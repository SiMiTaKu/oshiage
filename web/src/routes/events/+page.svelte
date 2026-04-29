<script lang="ts">
  import type { PageData } from './$types'
  import { goto } from '$app/navigation'
  import {
    CalendarIcon,
    MapPinIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  } from '@oshiage/design-system'

  let { data }: { data: PageData } = $props()

  const eventTypeOptions = [
    { value: '', label: 'すべて' },
    { value: 'competition', label: '大会' },
    { value: 'exhibition', label: '発表会' },
    { value: 'practice', label: '練習会' },
    { value: 'workshop', label: 'ワークショップ' },
  ]

  const eventTypeLabels: Record<string, string> = {
    competition: '大会',
    exhibition: '発表会',
    practice: '練習会',
    workshop: 'ワークショップ',
  }

  let selectedType = $state('')

  $effect(() => {
    selectedType = data.eventType ?? ''
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

  const totalPages = $derived(Math.ceil(data.total / 20))
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
          {#each eventTypeOptions as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- 件数 -->
    <p class="result-count">
      {data.total} 件のイベント
    </p>

    <!-- イベント一覧 -->
    {#if data.events.length === 0}
      <div class="empty-state">
        <CalendarIcon size={48} />
        <p class="empty-title">イベントが見つかりませんでした</p>
        <p class="empty-desc">フィルターを変えてお試しください。</p>
      </div>
    {:else}
      <div class="events-grid">
        {#each data.events as event (event.id)}
          <a href="/events/{event.id}" class="event-card">
            <div class="event-card-header">
              <span class="event-type-badge"
                >{eventTypeLabels[event.eventType] ?? event.eventType}</span
              >
              {#if event.fee}
                <span class="event-fee">¥{event.fee.toLocaleString()}</span>
              {/if}
            </div>
            <h2 class="event-title">{event.title}</h2>
            <div class="event-meta">
              <span class="event-meta-item">
                <CalendarIcon size={14} />
                {formatDate(event.startAt, event.endAt)}
              </span>
              <span class="event-meta-item">
                <MapPinIcon size={14} />
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
            disabled={data.page <= 1}
            onclick={() => changePage(data.page - 1)}
            aria-label="前のページ"
          >
            <ChevronLeftIcon size={16} />
          </button>
          <span class="pagination-info">{data.page} / {totalPages}</span>
          <button
            class="pagination-btn"
            type="button"
            disabled={data.page >= totalPages}
            onclick={() => changePage(data.page + 1)}
            aria-label="次のページ"
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .events-page {
    min-height: 100%;
  }

  .page-header {
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$indigo, 100)});
    border-bottom: 1px solid map.get(t.$border, default);
    padding: 2.5rem 1rem;
  }

  .page-header-inner {
    max-width: t.$container-max;
    margin: 0 auto;
  }

  .page-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0 0 0.5rem;
  }

  .page-desc {
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .page-body {
    max-width: t.$container-max;
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
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
  }

  .filter-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, md);
    font-size: map.get(t.$font-size, sm);
    background: map.get(t.$bg, surface);
    color: map.get(t.$text, primary);
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: map.get(t.$border, focus);
      box-shadow: 0 0 0 3px #{map.get(t.$indigo, 100)};
    }
  }

  .result-count {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    margin-bottom: 1.5rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 5rem 1rem;
    text-align: center;
    color: map.get(t.$text, muted);
  }

  .empty-title {
    font-size: map.get(t.$font-size, lg);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, secondary);
    margin: 0;
  }

  .empty-desc {
    font-size: map.get(t.$font-size, sm);
    margin: 0;
  }

  .events-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: #{map.get(t.$breakpoint, md)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get(t.$breakpoint, lg)}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .event-card {
    display: block;
    padding: 1.5rem;
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    text-decoration: none;
    transition:
      border-color map.get(t.$transition, base),
      box-shadow map.get(t.$transition, base),
      transform map.get(t.$transition, base);

    &:hover {
      border-color: rgb(79, 70, 229, 0.3);
      box-shadow: map.get(t.$shadow, lg);
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
    background: map.get(t.$indigo, 100);
    color: map.get(t.$indigo, 600);
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);
  }

  .event-fee {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
  }

  .event-title {
    font-size: map.get(t.$font-size, lg);
    font-weight: map.get(t.$font-weight, semibold);
    color: map.get(t.$text, primary);
    margin: 0 0 0.75rem;
    line-height: map.get(t.$line-height, snug);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color map.get(t.$transition, fast);

    .event-card:hover & {
      color: map.get(t.$indigo, 500);
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
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
  }

  .event-description {
    margin: 0.75rem 0 0;
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    line-height: map.get(t.$line-height, relaxed);
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
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, md);
    background: map.get(t.$bg, surface);
    cursor: pointer;
    color: map.get(t.$text, muted);
    transition:
      background map.get(t.$transition, fast),
      color map.get(t.$transition, fast);

    &:hover:not(:disabled) {
      color: map.get(t.$text, primary);
      background: map.get(t.$bg, muted);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .pagination-info {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
  }
</style>
