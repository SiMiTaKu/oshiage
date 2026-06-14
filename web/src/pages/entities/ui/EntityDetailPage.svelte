<script lang="ts">
  import dayjs from 'dayjs'
  import type { EntityResponseDto, EntityRevisionDto } from '@shared/api/generated/client'
  import { IconsGallery } from '@oshiage/design-system'
  import {
    CATEGORY_LABELS,
    STATUS_LABELS,
    STATUS_COLORS,
    ENTITIES_BREADCRUMB_HREF,
  } from '@pages/entities/config/entitiesPageConfig'

  let {
    entity,
    revisions,
  }: {
    entity: EntityResponseDto
    revisions: EntityRevisionDto[]
  } = $props()

  let activeTab = $state<'profile' | 'revisions'>('profile')

  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('YYYY年M月D日')
  }
</script>

<svelte:head>
  <title>{entity.currentRevision.name} | 推しアゲ</title>
  <meta
    name="description"
    content="{entity.currentRevision.profile ?? entity.currentRevision.name} - 男子新体操選手情報"
  />
  <meta property="og:title" content="{entity.currentRevision.name} | 推しアゲ" />
</svelte:head>

<div class="entity-detail-page">
  <!-- パンくず -->
  <div class="breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href={ENTITIES_BREADCRUMB_HREF} class="breadcrumb-back">
        <IconsGallery name="chevronLeft" size={16} color="gray" />
        選手・チーム一覧に戻る
      </a>
    </div>
  </div>

  <div class="page-content">
    <!-- ヒーロー -->
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
        <IconsGallery name="clock" size={14} color="gray" />
        変更履歴 ({revisions.length})
      </button>
    </div>

    <!-- タブコンテンツ -->
    {#if activeTab === 'profile'}
      <div class="tab-panel">
        <div class="profile-card">
          {#if entity.currentRevision.profile}
            <section class="profile-section">
              <h2 class="section-title">プロフィール</h2>
              <p class="profile-text">{entity.currentRevision.profile}</p>
            </section>
          {/if}

          <section class="profile-section">
            <h2 class="section-title">基本情報</h2>
            <dl class="info-table">
              <dt>名前</dt>
              <dd>{entity.currentRevision.name}</dd>
              <dt>種別</dt>
              <dd>{CATEGORY_LABELS[entity.entityCategory] ?? entity.entityCategory}</dd>
              <dt>状態</dt>
              <dd>{STATUS_LABELS[entity.activeStatus] ?? entity.activeStatus}</dd>
              {#if entity.currentRevision.sport}
                <dt>競技</dt>
                <dd>{entity.currentRevision.sport}</dd>
              {/if}
              {#if entity.currentRevision.area}
                <dt>活動地域</dt>
                <dd>{entity.currentRevision.area}</dd>
              {/if}
              <dt>登録日</dt>
              <dd>{formatDate(entity.createdAt)}</dd>
              <dt>更新日</dt>
              <dd>{formatDate(entity.updatedAt)}</dd>
            </dl>
          </section>
        </div>
      </div>
    {:else}
      <div class="tab-panel">
        {#if revisions.length === 0}
          <div class="empty-state">
            <IconsGallery name="clock" size={40} color="gray" />
            <p class="empty-title">変更履歴がありません</p>
          </div>
        {:else}
          <ol class="revisions-list">
            {#each revisions as rev (rev.revisionNo)}
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
  @use 'index' as *;

  .entity-detail-page {
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

  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid map.get($border, default);
  }

  .tab-btn {
    display: inline-flex;
    gap: 6px;
    padding: 12px 20px;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
    border: none;
    background: transparent;
    transition:
      color map.get($transition, fast),
      border-color map.get($transition, fast);
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &.active {
      color: map.get($brand, 500);
      border-bottom-color: map.get($brand, 500);
    }

    &:hover:not(.active) {
      color: map.get($text, primary);
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
    gap: 24px;
  }

  .profile-section {
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

  .profile-text {
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

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 64px 16px;
    text-align: center;
    color: map.get($text, muted);
  }

  .empty-title {
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, secondary);
  }

  .revisions-list {
    display: flex;
    gap: 16px;
    padding: 0;
    list-style: none;
    flex-direction: column;
  }

  .revision-item {
    padding: 20px 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);
  }

  .revision-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .revision-no {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, semibold);
    color: map.get($brand, 500);
  }

  .revision-date {
    font-size: map.get($font-size, xs);
    color: map.get($text, muted);
  }

  .revision-name {
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
  }

  .revision-reason {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }
</style>
