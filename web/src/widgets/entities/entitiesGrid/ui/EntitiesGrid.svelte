<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import type { EntityResponseDto } from '@shared/api/generated/client'
  import { CATEGORY_LABELS, STATUS_LABELS, STATUS_COLORS } from '../../config/entitiesPageConfig'
  import { ROUTES } from '@shared/routes'

  let {
    entities,
    total,
    page,
    totalPages,
    onPageChange,
  }: {
    entities: EntityResponseDto[]
    total: number
    page: number
    totalPages: number
    onPageChange: (p: number) => void
  } = $props()
</script>

<p class="result-count">{total} 件</p>

{#if entities.length === 0}
  <div class="empty-state">
    <IconsGallery name="user" size={48} color="gray" />
    <p class="empty-title">該当する選手・チームがありません</p>
    <p class="empty-desc">フィルターを変えてお試しください。</p>
  </div>
{:else}
  <div class="entities-grid">
    {#each entities as entity (entity.id)}
      <a href={ROUTES.entities.detail(String(entity.id))} class="entity-card">
        <div class="entity-card-header">
          <span class="category-badge">
            {#if entity.entityCategory === 'individual'}
              <IconsGallery name="user" size={12} color="gray" />
            {:else}
              <IconsGallery name="users" size={12} color="gray" />
            {/if}
            {CATEGORY_LABELS[entity.entityCategory] ?? entity.entityCategory}
          </span>
          <span class="status-badge {STATUS_COLORS[entity.activeStatus] ?? ''}">
            {STATUS_LABELS[entity.activeStatus] ?? entity.activeStatus}
          </span>
        </div>
        <h2 class="entity-name">{entity.currentRevision.name}</h2>
        {#if entity.currentRevision.sport}
          <p class="entity-sport">{entity.currentRevision.sport}</p>
        {/if}
        {#if entity.currentRevision.area}
          <p class="entity-area">{entity.currentRevision.area}</p>
        {/if}
        {#if entity.currentRevision.profile}
          <p class="entity-profile">{entity.currentRevision.profile}</p>
        {/if}
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

  .entities-grid {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get($breakpoint, lg)}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .entity-card {
    display: block;
    padding: 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
    transition:
      border-color map.get($transition, base),
      box-shadow map.get($transition, base),
      transform map.get($transition, base);
    text-decoration: none;

    &:hover {
      border-color: rgb(251, 112, 40, 0.3);
      box-shadow: map.get($shadow, lg);
      transform: translateY(-2px);
    }
  }

  .entity-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .category-badge {
    display: inline-flex;
    gap: 4px;
    padding: 3.2px 10px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    color: map.get($brand, 600);
    border-radius: map.get($radius, full);
    background: map.get($brand, 100);
    align-items: center;
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
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    transition: color map.get($transition, fast);

    .entity-card:hover & {
      color: map.get($brand, 500);
    }
  }

  .entity-sport,
  .entity-area {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .entity-profile {
    display: -webkit-box;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
