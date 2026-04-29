<script lang="ts">
  import type { PageData } from './$types'
  import { ChevronLeftIcon } from '@oshiage/design-system'

  let { data }: { data: PageData } = $props()

  const typeLabels: Record<string, string> = {
    specChange: '仕様変更',
    maintenance: 'メンテナンス',
    incident: 'インシデント',
  }
  const typeColors: Record<string, string> = {
    specChange: 'badge-spec',
    maintenance: 'badge-maintenance',
    incident: 'badge-incident',
  }
  const priorityLabels: Record<string, string> = {
    high: '高',
    medium: '中',
    low: '低',
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
</script>

<svelte:head>
  <title>{data.notice.title} | お知らせ | 推しアゲ</title>
  <meta name="description" content={data.notice.body.slice(0, 100)} />
</svelte:head>

<div class="notice-detail-page">
  <div class="breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href="/notices" class="breadcrumb-back">
        <ChevronLeftIcon size={16} />
        お知らせ一覧に戻る
      </a>
    </div>
  </div>

  <div class="page-content">
    <article class="notice-article">
      <header class="notice-header">
        <div class="notice-meta">
          <span class="notice-badge {typeColors[data.notice.noticeType] ?? ''}">
            {typeLabels[data.notice.noticeType] ?? data.notice.noticeType}
          </span>
          <span class="notice-date">{formatDate(data.notice.publishAt)}</span>
          {#if data.notice.priority !== 'low'}
            <span class="priority-label priority-{data.notice.priority}">
              優先度: {priorityLabels[data.notice.priority] ?? data.notice.priority}
            </span>
          {/if}
        </div>
        <h1 class="notice-title">{data.notice.title}</h1>
      </header>

      <div class="notice-body">
        <p>{data.notice.body}</p>
      </div>
    </article>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .notice-detail-page {
    min-height: 100%;
  }

  .breadcrumb-bar {
    border-bottom: 1px solid map.get(t.$border, default);
    background: map.get(t.$bg, surface);
    padding: 0.75rem 1rem;
  }

  .breadcrumb-inner {
    max-width: t.$container-max;
    margin: 0 auto;
  }

  .breadcrumb-back {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    text-decoration: none;
    transition: color map.get(t.$transition, fast);

    &:hover {
      color: map.get(t.$text, primary);
    }
  }

  .page-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .notice-article {
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    overflow: hidden;
  }

  .notice-header {
    padding: 2rem;
    border-bottom: 1px solid map.get(t.$border, default);
    background: map.get(t.$bg, muted);
  }

  .notice-meta {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .notice-badge {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);

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

  .notice-date {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$text, muted);
  }

  .priority-label {
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, medium);
    padding: 0.125rem 0.5rem;
    border-radius: map.get(t.$radius, full);

    &.priority-high {
      background: map.get(t.$error, 100);
      color: map.get(t.$error, 700);
    }
    &.priority-medium {
      background: map.get(t.$warning, 100);
      color: map.get(t.$warning, 700);
    }
  }

  .notice-title {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0;
    line-height: map.get(t.$line-height, snug);
  }

  .notice-body {
    padding: 2rem;

    p {
      font-size: map.get(t.$font-size, base);
      color: map.get(t.$text, secondary);
      line-height: map.get(t.$line-height, relaxed);
      margin: 0;
      white-space: pre-wrap;
    }
  }
</style>
