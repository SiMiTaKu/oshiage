<script lang="ts">
  import dayjs from 'dayjs'
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { EVENT_TYPE_LABELS } from '../../config/eventsPageConfig'

  const { event }: { event: EventResponseDto } = $props()

  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('YYYY年M月D日(ddd)')
  }
</script>

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

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

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
