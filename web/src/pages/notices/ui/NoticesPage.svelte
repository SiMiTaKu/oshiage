<script lang="ts">
  import { goto } from '$app/navigation'
  import { BellIcon, ChevronLeftIcon, ChevronRightIcon } from '@oshiage/design-system'
  import type { NoticeResponseDto } from '../../../shared/api/generated/client'

  let {
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

  const TYPE_OPTIONS = [
    { value: '', label: 'すべて' },
    { value: 'specChange', label: '仕様変更' },
    { value: 'maintenance', label: 'メンテナンス' },
    { value: 'incident', label: 'インシデント' },
  ]

  const TYPE_LABELS: Record<string, string> = {
    specChange: '仕様変更',
    maintenance: 'メンテナンス',
    incident: 'インシデント',
  }

  const TYPE_COLORS: Record<string, string> = {
    specChange: 'badge-spec',
    maintenance: 'badge-maintenance',
    incident: 'badge-incident',
  }

  const PRIORITY_COLORS: Record<string, string> = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
  }

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

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const totalPages = $derived(Math.ceil(total / 20))
</script>

<svelte:head>
  <title>お知らせ | 推しアゲ</title>
  <meta
    name="description"
    content="推しアゲからの最新お知らせ・メンテナンス情報をご確認いただけます。"
  />
</svelte:head>

<div class="notices-page">
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">お知らせ</h1>
      <p class="page-desc">サービスに関する最新情報をお知らせします。</p>
    </div>
  </div>

  <div class="page-body">
    <div class="filters">
      <div class="filter-group">
        <label class="filter-label" for="notice-type">種別</label>
        <select
          id="notice-type"
          class="filter-select"
          bind:value={selectedType}
          onchange={applyFilter}
        >
          {#each TYPE_OPTIONS as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <p class="result-count">{total} 件</p>

    {#if notices.length === 0}
      <div class="empty-state">
        <BellIcon size={48} color="gray" />
        <p class="empty-title">お知らせはありません</p>
        <p class="empty-desc">現在公開中のお知らせはありません。</p>
      </div>
    {:else}
      <div class="notices-list">
        {#each notices as notice (notice.id)}
          <a href="/notices/{notice.id}" class="notice-card">
            <div class="notice-meta">
              <span class="notice-badge {TYPE_COLORS[notice.noticeType] ?? ''}">
                {TYPE_LABELS[notice.noticeType] ?? notice.noticeType}
              </span>
              <span class="priority-dot {PRIORITY_COLORS[notice.priority] ?? ''}"></span>
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
  @use 'index' as t;

  .notices-page {
    min-height: 100%;
  }

  .page-header {
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$bg, muted)});
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
      box-shadow: 0 0 0 3px #{map.get(t.$border, strong)};
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

  .notices-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .notice-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem 1.5rem;
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    text-decoration: none;
    transition:
      border-color map.get(t.$transition, fast),
      box-shadow map.get(t.$transition, fast);

    &:hover {
      border-color: rgb(0, 0, 0, 0.2);
      box-shadow: map.get(t.$shadow, md);
    }

    @media (min-width: #{map.get(t.$breakpoint, md)}) {
      flex-direction: row;
      align-items: center;
    }
  }

  .notice-meta {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
  }

  .notice-badge {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);
    white-space: nowrap;

    &.badge-spec {
      background: map.get(t.$indigo, 100);
      color: map.get(t.$indigo, 600);
    }

    &.badge-maintenance {
      background: map.get(t.$warning, 100);
      color: map.get(t.$warning, 700);
    }

    &.badge-incident {
      background: map.get(t.$error, 100);
      color: map.get(t.$error, 700);
    }
  }

  .priority-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.priority-high {
      background: map.get(t.$error, 500);
    }

    &.priority-medium {
      background: map.get(t.$warning, 500);
    }

    &.priority-low {
      background: map.get(t.$bg, muted);
    }
  }

  .notice-date {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$text, muted);
    white-space: nowrap;
  }

  .notice-title {
    font-size: map.get(t.$font-size, base);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
    margin: 0;
    flex: 1;
    transition: color map.get(t.$transition, fast);

    .notice-card:hover & {
      color: map.get(t.$indigo, 500);
    }
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
