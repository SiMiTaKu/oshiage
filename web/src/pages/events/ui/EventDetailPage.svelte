<script lang="ts">
  import dayjs from 'dayjs'
  import { IconsGallery } from '@oshiage/design-system'
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { EVENT_TYPE_LABELS, EVENTS_BREADCRUMB_HREF } from '@pages/events/config/eventsPageConfig'

  let { event }: { event: EventResponseDto } = $props()

  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('YYYY年M月D日(ddd)')
  }
</script>

<svelte:head>
  <title>{event.title} | 推しアゲ</title>
  <meta name="description" content="{event.description ?? event.title} - 男子新体操イベント情報" />
  <meta property="og:title" content="{event.title} | 推しアゲ" />
  <meta property="og:description" content={event.description ?? ''} />
</svelte:head>

<div class="event-detail-page">
  <!-- パンくず -->
  <div class="breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href={EVENTS_BREADCRUMB_HREF} class="breadcrumb-back">
        <IconsGallery name="chevronLeft" size={16} color="gray" />
        イベント一覧に戻る
      </a>
    </div>
  </div>

  <div class="page-content">
    <!-- ヒーロー -->
    <div class="event-hero">
      <div class="event-hero-inner">
        <span class="event-type-badge">{EVENT_TYPE_LABELS[event.eventType] ?? event.eventType}</span
        >
        <h1 class="event-title">{event.title}</h1>
        <div class="event-meta">
          <span class="meta-item">
            <IconsGallery name="calendar" size={16} color="gray" />
            {formatDate(event.startAt)}
            {#if event.endAt}
              〜 {formatDate(event.endAt)}
            {/if}
          </span>
          <span class="meta-item">
            <IconsGallery name="mapPin" size={16} color="gray" />
            {event.place}
          </span>
        </div>
      </div>
    </div>

    <div class="detail-body">
      <!-- サイドバー (料金・アクション) -->
      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <p class="sidebar-label">参加費</p>
          <p class="sidebar-fee">
            {#if event.fee != null}
              ¥{event.fee.toLocaleString()}
            {:else}
              無料 / 要確認
            {/if}
          </p>
        </div>
      </aside>

      <!-- メインコンテンツ -->
      <article class="detail-main">
        {#if event.description}
          <section class="detail-section">
            <h2 class="section-title">イベント詳細</h2>
            <p class="detail-text">{event.description}</p>
          </section>
        {/if}

        <section class="detail-section">
          <h2 class="section-title">開催情報</h2>
          <dl class="info-table">
            <dt>開催日</dt>
            <dd>
              {formatDate(event.startAt)}
              {#if event.endAt}
                〜 {formatDate(event.endAt)}
              {/if}
            </dd>
            <dt>場所</dt>
            <dd>{event.place}</dd>
            <dt>種別</dt>
            <dd>{EVENT_TYPE_LABELS[event.eventType] ?? event.eventType}</dd>
            {#if event.fee != null}
              <dt>参加費</dt>
              <dd>¥{event.fee.toLocaleString()}</dd>
            {/if}
          </dl>
        </section>
      </article>
    </div>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .event-detail-page {
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
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }

  .event-hero {
    padding: 32px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($indigo, 50)});
  }

  .event-hero-inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .event-type-badge {
    display: inline-block;
    padding: 4px 12px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    color: map.get($indigo, 600);
    border-radius: map.get($radius, full);
    background: map.get($indigo, 100);
    align-self: flex-start;
  }

  .event-title {
    font-size: clamp(20px, 3vw, 30px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    line-height: map.get($line-height, snug);
  }

  .event-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .detail-body {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: #{map.get($breakpoint, lg)}) {
      flex-direction: row-reverse;
      align-items: flex-start;
    }
  }

  .detail-sidebar {
    @media (min-width: #{map.get($breakpoint, lg)}) {
      flex: 0 0 280px;
    }
  }

  .sidebar-card {
    padding: 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
  }

  .sidebar-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sidebar-fee {
    font-size: map.get($font-size, xl);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .detail-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .detail-section {
    padding: 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
  }

  .section-title {
    padding-bottom: 12px;
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    border-bottom: 1px solid map.get($border, default);
  }

  .detail-text {
    font-size: map.get($font-size, base);
    color: map.get($text, secondary);
    line-height: map.get($line-height, relaxed);
    white-space: pre-wrap;
  }

  .info-table {
    display: grid;
    gap: 10px 24px;
    grid-template-columns: max-content 1fr;

    dt {
      font-size: map.get($font-size, sm);
      font-weight: map.get($font-weight, medium);
      color: map.get($text, muted);
    }

    dd {
      font-size: map.get($font-size, sm);
      color: map.get($text, primary);
    }
  }
</style>
