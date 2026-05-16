<script lang="ts">
  import { ChevronLeftIcon } from '@oshiage/design-system'
  import type { NoticeResponseDto } from '../../../shared/api/generated/client'
  import {
    NOTICE_TYPE_LABELS,
    NOTICE_TYPE_COLORS,
    NOTICE_PRIORITY_LABELS,
    NOTICES_BREADCRUMB_HREF,
  } from '../config/noticesPageConfig'

  let { notice }: { notice: NoticeResponseDto } = $props()

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
</script>

<svelte:head>
  <title>{notice.title} | お知らせ | 推しアゲ</title>
  <meta name="description" content={notice.body.slice(0, 100)} />
</svelte:head>

<div class="notice-detail-page">
  <div class="breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href={NOTICES_BREADCRUMB_HREF} class="breadcrumb-back">
        <ChevronLeftIcon size={16} color="gray" />
        お知らせ一覧に戻る
      </a>
    </div>
  </div>

  <div class="page-content">
    <article class="notice-article">
      <header class="notice-header">
        <div class="notice-meta">
          <span class="notice-badge {NOTICE_TYPE_COLORS[notice.noticeType] ?? ''}">
            {NOTICE_TYPE_LABELS[notice.noticeType] ?? notice.noticeType}
          </span>
          <span class="notice-date">{formatDate(notice.publishAt)}</span>
          {#if notice.priority !== 'low'}
            <span class="priority-label priority-{notice.priority}">
              優先度: {NOTICE_PRIORITY_LABELS[notice.priority] ?? notice.priority}
            </span>
          {/if}
        </div>
        <h1 class="notice-title">{notice.title}</h1>
      </header>

      <div class="notice-body">
        <p>{notice.body}</p>
      </div>
    </article>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .notice-detail-page {
    min-height: 100%;
  }

  .breadcrumb-bar {
    border-bottom: 1px solid map.get($border, default);
    background: map.get($bg, surface);
    padding: 0.75rem 1rem;
  }

  .breadcrumb-inner {
    max-width: $container-max;
    margin: 0 auto;
  }

  .breadcrumb-back {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    text-decoration: none;
    transition: color map.get($transition, fast);

    &:hover {
      color: map.get($text, primary);
    }
  }

  .page-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .notice-article {
    background: map.get($bg, surface);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    overflow: hidden;
  }

  .notice-header {
    padding: 2rem;
    border-bottom: 1px solid map.get($border, default);
    background: map.get($bg, muted);
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
    border-radius: map.get($radius, full);
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);

    &.badge-spec {
      background: map.get($indigo, 100);
      color: map.get($indigo, 600);
    }

    &.badge-maintenance {
      background: map.get($warning, 100);
      color: map.get($warning, 700);
    }

    &.badge-incident {
      background: map.get($error, 100);
      color: map.get($error, 700);
    }
  }

  .notice-date {
    font-size: map.get($font-size, xs);
    color: map.get($text, muted);
  }

  .priority-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    padding: 0.125rem 0.5rem;
    border-radius: map.get($radius, full);

    &.priority-high {
      background: map.get($error, 100);
      color: map.get($error, 700);
    }

    &.priority-medium {
      background: map.get($warning, 100);
      color: map.get($warning, 700);
    }
  }

  .notice-title {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    margin: 0;
    line-height: map.get($line-height, snug);
  }

  .notice-body {
    padding: 2rem;

    p {
      font-size: map.get($font-size, base);
      color: map.get($text, secondary);
      line-height: map.get($line-height, relaxed);
      margin: 0;
      white-space: pre-wrap;
    }
  }
</style>
