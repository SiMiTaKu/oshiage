<script lang="ts">
  import type { PageData } from './$types'
  import { goto } from '$app/navigation'
  import { ChevronLeftIcon, ChevronRightIcon, UserIcon, UsersIcon } from '@oshiage/design-system'

  let { data }: { data: PageData } = $props()

  const categoryOptions = [
    { value: '', label: 'すべて' },
    { value: 'individual', label: '個人' },
    { value: 'group', label: 'グループ' },
  ]

  const statusOptions = [
    { value: '', label: 'すべて' },
    { value: 'active', label: '現役' },
    { value: 'retired', label: '引退' },
    { value: 'inactive', label: '休止' },
  ]

  const categoryLabels: Record<string, string> = {
    individual: '個人',
    group: 'グループ',
  }

  const statusLabels: Record<string, string> = {
    active: '現役',
    retired: '引退',
    inactive: '休止',
  }

  const statusColors: Record<string, string> = {
    active: 'badge-active',
    retired: 'badge-retired',
    inactive: 'badge-inactive',
  }

  let selectedCategory = $state('')
  let selectedStatus = $state('')

  $effect(() => {
    selectedCategory = data.category ?? ''
    selectedStatus = data.activeStatus ?? ''
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

  const totalPages = $derived(Math.ceil(data.total / 20))
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
          {#each categoryOptions as opt}
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
          {#each statusOptions as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <p class="result-count">{data.total} 件</p>

    {#if data.entities.length === 0}
      <div class="empty-state">
        <UserIcon size={48} />
        <p class="empty-title">該当する選手・チームがありません</p>
        <p class="empty-desc">フィルターを変えてお試しください。</p>
      </div>
    {:else}
      <div class="entities-grid">
        {#each data.entities as entity (entity.id)}
          <a href="/entities/{entity.id}" class="entity-card">
            <div class="entity-card-header">
              <span class="category-badge">
                {#if entity.entityCategory === 'individual'}
                  <UserIcon size={12} />
                {:else}
                  <UsersIcon size={12} />
                {/if}
                {categoryLabels[entity.entityCategory] ?? entity.entityCategory}
              </span>
              <span class="status-badge {statusColors[entity.activeStatus] ?? ''}">
                {statusLabels[entity.activeStatus] ?? entity.activeStatus}
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
            disabled={data.page <= 1}
            onclick={() => changePage(data.page - 1)}
            aria-label="前のページ"
          >
            <ChevronLeftIcon size={16} />
          </button>
          <span class="pagination-info">{data.page} / {totalPages}</span>
          <button
            class="pagination-btn"
            type="button"
            disabled={data.page >= totalPages}
            onclick={() => changePage(data.page + 1)}
            aria-label="次のページ"
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .entities-page {
    min-height: 100%;
  }

  .page-header {
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$brand, 50)});
    border-bottom: 1px solid map.get(t.$border, default);
    padding: 2.5rem 1rem;
  }

  .page-header-inner {
    max-width: t.$container-max;
    margin: 0 auto;
  }

  .page-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0 0 0.5rem;
  }

  .page-desc {
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .page-body {
    max-width: t.$container-max;
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
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
  }

  .filter-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, md);
    font-size: map.get(t.$font-size, sm);
    background: map.get(t.$bg, surface);
    color: map.get(t.$text, primary);
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: map.get(t.$border, focus);
      box-shadow: 0 0 0 3px #{map.get(t.$brand, 100)};
    }
  }

  .result-count {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    margin-bottom: 1.5rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 5rem 1rem;
    text-align: center;
    color: map.get(t.$text, muted);
  }

  .empty-title {
    font-size: map.get(t.$font-size, lg);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, secondary);
    margin: 0;
  }

  .empty-desc {
    font-size: map.get(t.$font-size, sm);
    margin: 0;
  }

  .entities-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: #{map.get(t.$breakpoint, sm)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get(t.$breakpoint, lg)}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .entity-card {
    display: block;
    padding: 1.5rem;
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    text-decoration: none;
    transition:
      border-color map.get(t.$transition, base),
      box-shadow map.get(t.$transition, base),
      transform map.get(t.$transition, base);

    &:hover {
      border-color: rgb(251, 112, 40, 0.3);
      box-shadow: map.get(t.$shadow, lg);
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
    background: map.get(t.$brand, 100);
    color: map.get(t.$brand, 600);
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);
  }

  .status-badge {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, medium);

    &.badge-active {
      background: map.get(t.$success, 100);
      color: map.get(t.$success, 700);
    }

    &.badge-retired {
      background: map.get(t.$bg, muted);
      color: map.get(t.$text, muted);
    }

    &.badge-inactive {
      background: map.get(t.$warning, 100);
      color: map.get(t.$warning, 700);
    }
  }

  .entity-name {
    font-size: map.get(t.$font-size, lg);
    font-weight: map.get(t.$font-weight, semibold);
    color: map.get(t.$text, primary);
    margin: 0 0 0.375rem;
    transition: color map.get(t.$transition, fast);

    .entity-card:hover & {
      color: map.get(t.$brand, 500);
    }
  }

  .entity-sport,
  .entity-area {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    margin: 0 0 0.25rem;
  }

  .entity-profile {
    margin: 0.5rem 0 0;
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    line-height: map.get(t.$line-height, relaxed);
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
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, md);
    background: map.get(t.$bg, surface);
    cursor: pointer;
    color: map.get(t.$text, muted);
    transition:
      background map.get(t.$transition, fast),
      color map.get(t.$transition, fast);

    &:hover:not(:disabled) {
      color: map.get(t.$text, primary);
      background: map.get(t.$bg, muted);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .pagination-info {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
  }
</style>
