<script lang="ts">
  import { goto } from '$app/navigation'
  import { ChevronLeftIcon, ChevronRightIcon, UserIcon, UsersIcon } from '@oshiage/design-system'
  import type { EntityResponseDto } from '../../../shared/api/generated/client'
  import {
    CATEGORY_OPTIONS,
    STATUS_OPTIONS,
    CATEGORY_LABELS,
    STATUS_LABELS,
    STATUS_COLORS,
    ENTITIES_BREADCRUMB_HREF,
  } from '../config/entitiesPageConfig'
  import { ROUTES } from '../../../shared/routes'

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

  let selectedCategory = $state(category)
  let selectedStatus = $state(activeStatus)

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
          {#each CATEGORY_OPTIONS as opt}
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
          {#each STATUS_OPTIONS as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <p class="result-count">{total} 件</p>

    {#if entities.length === 0}
      <div class="empty-state">
        <UserIcon size={48} color="gray" />
        <p class="empty-title">該当する選手・チームがありません</p>
        <p class="empty-desc">フィルターを変えてお試しください。</p>
      </div>
    {:else}
      <div class="entities-grid">
        {#each entities as entity (entity.id)}
          <a href={ROUTES.entities.detail(entity.id)} class="entity-card">
            <div class="entity-card-header">
              <span class="category-badge">
                {#if entity.entityCategory === 'individual'}
                  <UserIcon size={12} color="gray" />
                {:else}
                  <UsersIcon size={12} color="gray" />
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
            <ChevronLeftIcon size={16} color="gray" />
          </button>
          <span class="pagination-info">{page} / {totalPages}</span>
          <button
            class="pagination-btn"
            type="button"
            disabled={page >= totalPages}
            onclick={() => changePage(page + 1)}
            aria-label="次のページ"
          >
            <ChevronRightIcon size={16} color="gray" />
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
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($brand, 50)});
    border-bottom: 1px solid map.get($border, default);
    padding: 2.5rem 1rem;
  }

  .page-header-inner {
    max-width: $container-max;
    margin: 0 auto;
  }

  .page-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    margin: 0 0 0.5rem;
  }

  .page-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
    margin: 0;
  }

  .page-body {
    max-width: $container-max;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .filter-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .filter-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    font-size: map.get($font-size, sm);
    background: map.get($bg, surface);
    color: map.get($text, primary);
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
    margin-bottom: 1.5rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 5rem 1rem;
    text-align: center;
    color: map.get($text, muted);
  }

  .empty-title {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, secondary);
    margin: 0;
  }

  .empty-desc {
    font-size: map.get($font-size, sm);
    margin: 0;
  }

  .entities-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get($breakpoint, lg)}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .entity-card {
    display: block;
    padding: 1.5rem;
    background: map.get($bg, surface);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    text-decoration: none;
    transition:
      border-color map.get($transition, base),
      box-shadow map.get($transition, base),
      transform map.get($transition, base);

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
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .category-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.2rem 0.625rem;
    background: map.get($brand, 100);
    color: map.get($brand, 600);
    border-radius: map.get($radius, full);
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
  }

  .status-badge {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    border-radius: map.get($radius, full);
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);

    &.badge-active {
      background: map.get($success, 100);
      color: map.get($success, 700);
    }

    &.badge-retired {
      background: map.get($bg, muted);
      color: map.get($text, muted);
    }

    &.badge-inactive {
      background: map.get($warning, 100);
      color: map.get($warning, 700);
    }
  }

  .entity-name {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    margin: 0 0 0.375rem;
    transition: color map.get($transition, fast);

    .entity-card:hover & {
      color: map.get($brand, 500);
    }
  }

  .entity-sport,
  .entity-area {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    margin: 0 0 0.25rem;
  }

  .entity-profile {
    margin: 0.5rem 0 0;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    cursor: pointer;
    color: map.get($text, muted);
    transition:
      background map.get($transition, fast),
      color map.get($transition, fast);

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
