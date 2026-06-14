<script lang="ts">
  import dayjs from 'dayjs'
  import { IconsGallery } from '@oshiage/design-system'
  import type { NoticeResponseDto } from '@shared/api/generated/client'
  import {
    NOTICE_TYPE_LABELS,
    NOTICE_TYPE_COLORS,
    NOTICE_PRIORITY_LABELS,
    NOTICES_BREADCRUMB_HREF,
  } from '@pages/notices/config/noticesPageConfig'

  let { notice }: { notice: NoticeResponseDto } = $props()

  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('YYYY年M月D日')
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
        <IconsGallery name="chevronLeft" size={16} color="gray" />
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
            {@const priorityClass =
              notice.priority === 'high'
                ? 'priority-high'
                : notice.priority === 'medium'
                  ? 'priority-medium'
                  : ''}
            <span class="priority-label {priorityClass}">
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
    padding: 12px 16px;
    background: map.get($bg, surface);
    border-bottom: 1px solid map.get($border, default);
  }

  .breadcrumb-inner {
    max-width: $container-max;
    place-self: center;
  }

  .breadcrumb-back {
    display: inline-flex;
    align-items: center;
    gap: 4px;
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
    place-self: center;
    padding: 32px 16px;
  }

  .notice-article {
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
    overflow: hidden;
  }

  .notice-header {
    padding: 32px;
    border-bottom: 1px solid map.get($border, default);
    background: map.get($bg, muted);
  }

  .notice-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .notice-badge {
    display: inline-block;
    padding: 3.2px 10px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    border-radius: map.get($radius, full);

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

  .notice-date {
    font-size: map.get($font-size, xs);
    color: map.get($text, muted);
  }

  .priority-label {
    padding: 2px 8px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    border-radius: map.get($radius, full);
  }

  .priority-high {
    padding: 2px 8px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($error, 700);
    border-radius: map.get($radius, full);
    background: map.get($error, 100);
  }

  .priority-medium {
    padding: 2px 8px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($warning, 700);
    border-radius: map.get($radius, full);
    background: map.get($warning, 100);
  }

  .notice-title {
    font-size: clamp(18px, 2.5vw, 24px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    line-height: map.get($line-height, snug);
  }

  .notice-body {
    padding: 32px;

    p {
      font-size: map.get($font-size, base);
      color: map.get($text, secondary);
      line-height: map.get($line-height, relaxed);
      white-space: pre-wrap;
    }
  }
</style>
