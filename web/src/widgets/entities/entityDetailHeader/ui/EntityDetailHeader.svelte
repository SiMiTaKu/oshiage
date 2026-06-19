<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import type { EntityResponseDto } from '@shared/api/generated/client'
  import {
    CATEGORY_LABELS,
    STATUS_LABELS,
    STATUS_COLORS,
    ENTITIES_BREADCRUMB_HREF,
  } from '../../config/entitiesPageConfig'

  const { entity }: { entity: EntityResponseDto } = $props()
</script>

<div class="breadcrumb-bar">
  <div class="breadcrumb-inner">
    <a href={ENTITIES_BREADCRUMB_HREF} class="breadcrumb-back">
      <IconsGallery name="chevronLeft" size={16} color="gray" />
      選手・チーム一覧に戻る
    </a>
  </div>
</div>

<div class="entity-hero">
  <div class="entity-icon">
    {#if entity.entityCategory === 'individual'}
      <IconsGallery name="user" size={40} color="secondary" />
    {:else}
      <IconsGallery name="users" size={40} color="secondary" />
    {/if}
  </div>
  <div class="entity-hero-info">
    <div class="entity-badges">
      <span class="category-badge">
        {CATEGORY_LABELS[entity.entityCategory] ?? entity.entityCategory}
      </span>
      <span class="status-badge {STATUS_COLORS[entity.activeStatus] ?? ''}">
        {STATUS_LABELS[entity.activeStatus] ?? entity.activeStatus}
      </span>
    </div>
    <h1 class="entity-name">{entity.currentRevision.name}</h1>
    {#if entity.currentRevision.sport}
      <p class="entity-sport">{entity.currentRevision.sport}</p>
    {/if}
    {#if entity.currentRevision.area}
      <p class="entity-area">{entity.currentRevision.area}</p>
    {/if}
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

  .entity-hero {
    display: flex;
    gap: 24px;
    padding: 32px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($brand, 50)});
    align-items: flex-start;
  }

  .entity-icon {
    display: flex;
    width: 80px;
    height: 80px;
    color: map.get($brand, 500);
    border-radius: map.get($radius, xl);
    background: map.get($brand, 100);
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .entity-hero-info {
    flex: 1;
    min-width: 0;
  }

  .entity-badges {
    display: flex;
    gap: 8px;
  }

  .category-badge {
    display: inline-block;
    padding: 3.2px 10px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    color: map.get($brand, 600);
    border-radius: map.get($radius, full);
    background: map.get($brand, 100);
  }

  .status-badge {
    display: inline-block;
    padding: 3.2px 10px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    border-radius: map.get($radius, full);

    &.badge-active {
      color: map.get($success, 700);
      background: map.get($success, 100);
    }

    &.badge-retired {
      color: map.get($text, muted);
      background: map.get($bg, muted);
    }

    &.badge-inactive {
      color: map.get($warning, 700);
      background: map.get($warning, 100);
    }
  }

  .entity-name {
    font-size: clamp(20px, 3vw, 30px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .entity-sport,
  .entity-area {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }
</style>
