<script lang="ts">
  import dayjs from 'dayjs'
  import { IconsGallery } from '@oshiage/design-system'
  import type { NoticeResponseDto } from '@shared/api/generated/client'
  import {
    NOTICE_TYPE_OPTIONS,
    NOTICE_TYPE_LABELS,
    NOTICE_TYPE_COLORS,
    NOTICE_PRIORITY_COLORS,
  } from '../../config/noticesPageConfig'
  import { ROUTES } from '@shared/routes'

  let {
    notices,
    total,
    page,
    totalPages,
    selectedType = $bindable(''),
    onTypeChange,
    onPageChange,
  }: {
    notices: NoticeResponseDto[]
    total: number
    page: number
    totalPages: number
    selectedType: string
    onTypeChange: () => void
    onPageChange: (p: number) => void
  } = $props()

  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('YYYY年M月D日')
  }
</script>

<div class="filters">
  <div class="filter-group">
    <label class="filter-label" for="notice-type">種別</label>
    <select
      id="notice-type"
      class="filter-select"
      bind:value={selectedType}
      onchange={onTypeChange}
    >
      {#each NOTICE_TYPE_OPTIONS as opt, index (index)}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  </div>
</div>

<p class="result-count">{total} 件</p>

{#if notices.length === 0}
  <div class="empty-state">
    <IconsGallery name="bell" size={48} color="gray" />
    <p class="empty-title">お知らせはありません</p>
    <p class="empty-desc">現在公開中のお知らせはありません。</p>
  </div>
{:else}
  <div class="notices-list">
    {#each notices as notice (notice.id)}
      <a href={ROUTES.notices.detail(String(notice.id))} class="notice-card">
        <div class="notice-meta">
          <span class="notice-badge {NOTICE_TYPE_COLORS[notice.noticeType] ?? ''}">
            {NOTICE_TYPE_LABELS[notice.noticeType] ?? notice.noticeType}
          </span>
          <span class="priority-dot {NOTICE_PRIORITY_COLORS[notice.priority] ?? ''}"></span>
          <span class="notice-date">{formatDate(notice.publishAt)}</span>
        </div>
        <p class="notice-title">{notice.title}</p>
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
      box-shadow: 0 0 0 3px #{map.get($border, strong)};
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

  .notices-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .notice-card {
    display: flex;
    gap: 8px;
    padding: 20px 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
    transition:
      border-color map.get($transition, fast),
      box-shadow map.get($transition, fast);
    flex-direction: column;
    text-decoration: none;

    &:hover {
      border-color: rgb(0, 0, 0, 0.2);
      box-shadow: map.get($shadow, md);
    }

    @media (min-width: #{map.get($breakpoint, md)}) {
      flex-direction: row;
      align-items: center;
    }
  }

  .notice-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .notice-badge {
    display: inline-block;
    padding: 3.2px 10px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    border-radius: map.get($radius, full);
    white-space: nowrap;

    &.badge-spec {
      color: map.get($indigo, 600);
      background: map.get($indigo, 100);
    }

    &.badge-maintenance {
      color: map.get($warning, 700);
      background: map.get($warning, 100);
    }

    &.badge-incident {
      color: map.get($error, 700);
      background: map.get($error, 100);
    }
  }

  .priority-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.priority-high {
      background: map.get($error, 500);
    }

    &.priority-medium {
      background: map.get($warning, 500);
    }

    &.priority-low {
      background: map.get($bg, muted);
    }
  }

  .notice-date {
    font-size: map.get($font-size, xs);
    color: map.get($text, muted);
    white-space: nowrap;
  }

  .notice-title {
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
    flex: 1;
    transition: color map.get($transition, fast);

    .notice-card:hover & {
      color: map.get($indigo, 500);
    }
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
