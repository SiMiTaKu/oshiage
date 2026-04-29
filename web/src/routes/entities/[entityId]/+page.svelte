<script lang="ts">
  import type { PageData } from './$types'
  import { ChevronLeftIcon, UserIcon, UsersIcon, ClockIcon } from '@oshiage/design-system'

  let { data }: { data: PageData } = $props()

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

  let activeTab = $state<'profile' | 'revisions'>('profile')

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
</script>

<svelte:head>
  <title>{data.entity.currentRevision.name} | 推しアゲ</title>
  <meta
    name="description"
    content="{data.entity.currentRevision.profile ??
      data.entity.currentRevision.name} - 男子新体操選手情報"
  />
  <meta property="og:title" content="{data.entity.currentRevision.name} | 推しアゲ" />
</svelte:head>

<div class="entity-detail-page">
  <!-- パンくず -->
  <div class="breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href="/entities" class="breadcrumb-back">
        <ChevronLeftIcon size={16} />
        選手・チーム一覧に戻る
      </a>
    </div>
  </div>

  <div class="page-content">
    <!-- ヒーロー -->
    <div class="entity-hero">
      <div class="entity-icon">
        {#if data.entity.entityCategory === 'individual'}
          <UserIcon size={40} />
        {:else}
          <UsersIcon size={40} />
        {/if}
      </div>
      <div class="entity-hero-info">
        <div class="entity-badges">
          <span class="category-badge">
            {categoryLabels[data.entity.entityCategory] ?? data.entity.entityCategory}
          </span>
          <span class="status-badge {statusColors[data.entity.activeStatus] ?? ''}">
            {statusLabels[data.entity.activeStatus] ?? data.entity.activeStatus}
          </span>
        </div>
        <h1 class="entity-name">{data.entity.currentRevision.name}</h1>
        {#if data.entity.currentRevision.sport}
          <p class="entity-sport">{data.entity.currentRevision.sport}</p>
        {/if}
        {#if data.entity.currentRevision.area}
          <p class="entity-area">{data.entity.currentRevision.area}</p>
        {/if}
      </div>
    </div>

    <!-- タブ -->
    <div class="tabs">
      <button
        type="button"
        class="tab-btn"
        class:active={activeTab === 'profile'}
        onclick={() => (activeTab = 'profile')}
      >
        プロフィール
      </button>
      <button
        type="button"
        class="tab-btn"
        class:active={activeTab === 'revisions'}
        onclick={() => (activeTab = 'revisions')}
      >
        <ClockIcon size={14} />
        変更履歴 ({data.revisions.length})
      </button>
    </div>

    <!-- タブコンテンツ -->
    {#if activeTab === 'profile'}
      <div class="tab-panel">
        <div class="profile-card">
          {#if data.entity.currentRevision.profile}
            <section class="profile-section">
              <h2 class="section-title">プロフィール</h2>
              <p class="profile-text">{data.entity.currentRevision.profile}</p>
            </section>
          {/if}

          <section class="profile-section">
            <h2 class="section-title">基本情報</h2>
            <dl class="info-table">
              <dt>名前</dt>
              <dd>{data.entity.currentRevision.name}</dd>
              <dt>種別</dt>
              <dd>{categoryLabels[data.entity.entityCategory] ?? data.entity.entityCategory}</dd>
              <dt>状態</dt>
              <dd>{statusLabels[data.entity.activeStatus] ?? data.entity.activeStatus}</dd>
              {#if data.entity.currentRevision.sport}
                <dt>競技</dt>
                <dd>{data.entity.currentRevision.sport}</dd>
              {/if}
              {#if data.entity.currentRevision.area}
                <dt>活動地域</dt>
                <dd>{data.entity.currentRevision.area}</dd>
              {/if}
              <dt>登録日</dt>
              <dd>{formatDate(data.entity.createdAt)}</dd>
              <dt>更新日</dt>
              <dd>{formatDate(data.entity.updatedAt)}</dd>
            </dl>
          </section>
        </div>
      </div>
    {:else}
      <div class="tab-panel">
        {#if data.revisions.length === 0}
          <div class="empty-state">
            <ClockIcon size={40} />
            <p class="empty-title">変更履歴がありません</p>
          </div>
        {:else}
          <ol class="revisions-list">
            {#each data.revisions as rev (rev.revisionNo)}
              <li class="revision-item">
                <div class="revision-header">
                  <span class="revision-no">第 {rev.revisionNo} 版</span>
                  <span class="revision-date">{formatDate(rev.createdAt)}</span>
                </div>
                <p class="revision-name">{rev.name}</p>
                {#if rev.reason}
                  <p class="revision-reason">{rev.reason}</p>
                {/if}
              </li>
            {/each}
          </ol>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .entity-detail-page {
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

  .entity-hero {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$brand, 50)});
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .entity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: map.get(t.$brand, 100);
    color: map.get(t.$brand, 500);
    border-radius: map.get(t.$radius, xl);
    flex-shrink: 0;
  }

  .entity-hero-info {
    flex: 1;
    min-width: 0;
  }

  .entity-badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .category-badge {
    display: inline-block;
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
    font-size: clamp(1.25rem, 3vw, 1.875rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0 0 0.25rem;
  }

  .entity-sport,
  .entity-area {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid map.get(t.$border, default);
    margin-bottom: 2rem;
  }

  .tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1.25rem;
    border: none;
    background: transparent;
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition:
      color map.get(t.$transition, fast),
      border-color map.get(t.$transition, fast);

    &.active {
      color: map.get(t.$brand, 500);
      border-bottom-color: map.get(t.$brand, 500);
    }

    &:hover:not(.active) {
      color: map.get(t.$text, primary);
    }
  }

  .tab-panel {
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .profile-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-section {
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

  .profile-text {
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

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 4rem 1rem;
    text-align: center;
    color: map.get(t.$text, muted);
  }

  .empty-title {
    font-size: map.get(t.$font-size, base);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, secondary);
    margin: 0;
  }

  .revisions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .revision-item {
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    padding: 1.25rem 1.5rem;
  }

  .revision-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .revision-no {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, semibold);
    color: map.get(t.$brand, 500);
  }

  .revision-date {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$text, muted);
  }

  .revision-name {
    font-size: map.get(t.$font-size, base);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
    margin: 0 0 0.25rem;
  }

  .revision-reason {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    margin: 0;
  }
</style>
