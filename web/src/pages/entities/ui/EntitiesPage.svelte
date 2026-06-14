<script lang="ts">
  import { goto } from '$app/navigation'
  import { IconsGallery } from '@oshiage/design-system'
  import type { EntityResponseDto } from '@shared/api/generated/client'
  import {
    CATEGORY_OPTIONS,
    STATUS_OPTIONS,
    CATEGORY_LABELS,
    STATUS_LABELS,
    STATUS_COLORS,
  } from '@pages/entities/config/entitiesPageConfig'
  import { ROUTES } from '@shared/routes'

  let {
    entities,
    total,
    page,
    category,
    activeStatus,
  }: {
    entities: EntityResponseDto[]
    total: number
    page: number
    category: string
    activeStatus: string
  } = $props()

  let selectedCategory = $state('')
  let selectedStatus = $state('')

  $effect(() => {
    selectedCategory = category
    selectedStatus = activeStatus
  })

  function applyFilter() {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedStatus) params.set('status', selectedStatus)
    params.set('page', '1')
    goto(`/entities?${params.toString()}`)
  }

  function changePage(p: number) {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedStatus) params.set('status', selectedStatus)
    params.set('page', String(p))
    goto(`/entities?${params.toString()}`)
  }

  const totalPages = $derived(Math.ceil(total / 20))
</script>

<svelte:head>
  <title>エンティティ一覧 | 推しアゲ</title>
  <meta
    name="description"
    content="男子新体操の選手・チームのプロフィール情報を一覧で確認できます。"
  />
</svelte:head>

<div class="entities-page">
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">選手・チーム一覧</h1>
      <p class="page-desc">男子新体操の選手・グループのプロフィール情報を閲覧できます。</p>
    </div>
  </div>

  <div class="page-body">
    <!-- フィルター -->
    <div class="filters">
      <div class="filter-group">
        <label class="filter-label" for="entity-category">種別</label>
        <select
          id="entity-category"
          class="filter-select"
          bind:value={selectedCategory}
          onchange={applyFilter}
        >
          {#each CATEGORY_OPTIONS as opt, index (index)}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label" for="entity-status">状態</label>
        <select
          id="entity-status"
          class="filter-select"
          bind:value={selectedStatus}
          onchange={applyFilter}
        >
          {#each STATUS_OPTIONS as opt, index (index)}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    </div>

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
            onclick={() => changePage(page - 1)}
            aria-label="前のページ"
          >
            <IconsGallery name="chevronLeft" size={16} color="gray" />
          </button>
          <span class="pagination-info">{page} / {totalPages}</span>
          <button
            class="pagination-btn"
            type="button"
            disabled={page >= totalPages}
            onclick={() => changePage(page + 1)}
            aria-label="次のページ"
          >
            <IconsGallery name="chevronRight" size={16} color="gray" />
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .entities-page {
    min-height: 100%;
  }

  .page-header {
    padding: 40px 16px;
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($brand, 50)});
    border-bottom: 1px solid map.get($border, default);
  }

  .page-header-inner {
    max-width: $container-max;
    place-self: center;
  }

  .page-title {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .page-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
  }

  .page-body {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }

  .filters {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .filter-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .filter-select {
    padding: 8px 32px 8px 12px;
    font-size: map.get($font-size, sm);
    color: map.get($text, primary);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: map.get($border, focus);
      box-shadow: 0 0 0 3px #{map.get($brand, 100)};
    }
  }

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
