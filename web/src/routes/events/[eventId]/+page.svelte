<script lang="ts">
  import type { PageData } from './$types'
  import { CalendarIcon, MapPinIcon, ChevronLeftIcon } from '@oshiage/design-system'

  let { data }: { data: PageData } = $props()

  const EVENT_TYPE_LABELS: Record<string, string> = {
    competition: '大会',
    exhibition: '発表会',
    practice: '練習会',
    workshop: 'ワークショップ',
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    })
  }
</script>

<svelte:head>
  <title>{data.event.title} | 推しアゲ</title>
  <meta
    name="description"
    content="{data.event.description ?? data.event.title} - 男子新体操イベント情報"
  />
  <meta property="og:title" content="{data.event.title} | 推しアゲ" />
  <meta property="og:description" content={data.event.description ?? ''} />
</svelte:head>

<div class="event-detail-page">
  <!-- パンくず -->
  <div class="breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href="/events" class="breadcrumb-back">
        <ChevronLeftIcon size={16} color="gray" />
        イベント一覧に戻る
      </a>
    </div>
  </div>

  <div class="page-content">
    <!-- ヒーロー -->
    <div class="event-hero">
      <div class="event-hero-inner">
        <span class="event-type-badge"
          >{EVENT_TYPE_LABELS[data.event.eventType] ?? data.event.eventType}</span
        >
        <h1 class="event-title">{data.event.title}</h1>
        <div class="event-meta">
          <span class="meta-item">
            <CalendarIcon size={16} color="gray" />
            {formatDate(data.event.startAt)}
            {#if data.event.endAt}
              〜 {formatDate(data.event.endAt)}
            {/if}
          </span>
          <span class="meta-item">
            <MapPinIcon size={16} color="gray" />
            {data.event.place}
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
            {#if data.event.fee != null}
              ¥{data.event.fee.toLocaleString()}
            {:else}
              無料 / 要確認
            {/if}
          </p>
        </div>
      </aside>

      <!-- メインコンテンツ -->
      <article class="detail-main">
        {#if data.event.description}
          <section class="detail-section">
            <h2 class="section-title">イベント詳細</h2>
            <p class="detail-text">{data.event.description}</p>
          </section>
        {/if}

        <section class="detail-section">
          <h2 class="section-title">開催情報</h2>
          <dl class="info-table">
            <dt>開催日</dt>
            <dd>
              {formatDate(data.event.startAt)}
              {#if data.event.endAt}
                〜 {formatDate(data.event.endAt)}
              {/if}
            </dd>
            <dt>場所</dt>
            <dd>{data.event.place}</dd>
            <dt>種別</dt>
            <dd>{EVENT_TYPE_LABELS[data.event.eventType] ?? data.event.eventType}</dd>
            {#if data.event.fee != null}
              <dt>参加費</dt>
              <dd>¥{data.event.fee.toLocaleString()}</dd>
            {/if}
          </dl>
        </section>
      </article>
    </div>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .event-detail-page {
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
    max-width: t.$container-max;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .event-hero {
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$indigo, 50)});
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .event-hero-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .event-type-badge {
    display: inline-block;
    align-self: flex-start;
    padding: 0.25rem 0.75rem;
    background: map.get(t.$indigo, 100);
    color: map.get(t.$indigo, 600);
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);
  }

  .event-title {
    font-size: clamp(1.25rem, 3vw, 1.875rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0;
    line-height: map.get(t.$line-height, snug);
  }

  .event-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
  }

  .detail-body {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: #{map.get(t.$breakpoint, lg)}) {
      flex-direction: row-reverse;
      align-items: flex-start;
    }
  }

  .detail-sidebar {
    @media (min-width: #{map.get(t.$breakpoint, lg)}) {
      flex: 0 0 280px;
    }
  }

  .sidebar-card {
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    padding: 1.5rem;
  }

  .sidebar-label {
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
    margin: 0 0 0.375rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sidebar-fee {
    font-size: map.get(t.$font-size, xl);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0;
  }

  .detail-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .detail-section {
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    padding: 1.5rem;
  }

  .section-title {
    font-size: map.get(t.$font-size, lg);
    font-weight: map.get(t.$font-weight, semibold);
    color: map.get(t.$text, primary);
    margin: 0 0 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid map.get(t.$border, default);
  }

  .detail-text {
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, secondary);
    line-height: map.get(t.$line-height, relaxed);
    margin: 0;
    white-space: pre-wrap;
  }

  .info-table {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.625rem 1.5rem;
    margin: 0;

    dt {
      font-size: map.get(t.$font-size, sm);
      font-weight: map.get(t.$font-weight, medium);
      color: map.get(t.$text, muted);
    }

    dd {
      font-size: map.get(t.$font-size, sm);
      color: map.get(t.$text, primary);
      margin: 0;
    }
  }
</style>
