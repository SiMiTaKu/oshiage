<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { EVENT_TYPE_LABELS } from '../../config/eventsPageConfig'
  import { ROUTES } from '@shared/routes'

  let {
    events,
    total,
    page,
    totalPages,
    onPageChange,
  }: {
    events: EventResponseDto[]
    total: number
    page: number
    totalPages: number
    onPageChange: (p: number) => void
  } = $props()

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
</script>

<p class="result-count">
  {total} 件のイベント
</p>

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

  {#if totalPages > 1}
    <div class="pagination">
      <button
        class="pagination-btn"
        type="button"
        disabled={page <= 1}
        onclick={() => onPageChange(page - 1)}
        aria-label="前のページ"
      >
        <IconsGallery name="chevronLeft" size={16} color="gray" />
      </button>
      <span class="pagination-info">{page} / {totalPages}</span>
      <button
        class="pagination-btn"
        type="button"
        disabled={page >= totalPages}
        onclick={() => onPageChange(page + 1)}
        aria-label="次のページ"
      >
        <IconsGallery name="chevronRight" size={16} color="gray" />
      </button>
    </div>
  {/if}
{/if}

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

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
