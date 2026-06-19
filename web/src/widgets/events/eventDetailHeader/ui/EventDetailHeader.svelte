<script lang="ts">
  import dayjs from 'dayjs'
  import { IconsGallery } from '@oshiage/design-system'
  import type { EventResponseDto } from '@shared/api/generated/client'
  import { EVENT_TYPE_LABELS, EVENTS_BREADCRUMB_HREF } from '../../config/eventsPageConfig'

  const { event }: { event: EventResponseDto } = $props()

  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('YYYY年M月D日(ddd)')
  }
</script>

<div class="breadcrumb-bar">
  <div class="breadcrumb-inner">
    <a href={EVENTS_BREADCRUMB_HREF} class="breadcrumb-back">
      <IconsGallery name="chevronLeft" size={16} color="gray" />
      イベント一覧に戻る
    </a>
  </div>
</div>

<div class="event-hero">
  <div class="event-hero-inner">
    <span class="event-type-badge">{EVENT_TYPE_LABELS[event.eventType] ?? event.eventType}</span>
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

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

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
</style>
