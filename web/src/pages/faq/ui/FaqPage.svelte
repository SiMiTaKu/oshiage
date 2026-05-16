<script lang="ts">
  import { FAQ_ITEMS } from '../config/faqPageConfig'

  let openIds = $state<Set<string>>(new Set())

  function toggle(id: string) {
    if (openIds.has(id)) {
      openIds.delete(id)
    } else {
      openIds.add(id)
    }
    openIds = new Set(openIds)
  }
</script>

<svelte:head>
  <title>よくある質問 | 推しアゲ</title>
  <meta
    name="description"
    content="推しアゲのよくある質問（FAQ）ページです。サービスの使い方や会員登録など、よくあるご質問にお答えします。"
  />
</svelte:head>

<div class="faq-page">
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">よくある質問</h1>
      <p class="page-desc">ご不明な点があればお気軽にお問い合わせください。</p>
    </div>
  </div>

  <div class="page-body">
    <div class="faq-list">
      {#each FAQ_ITEMS as item (item.id)}
        {@const isOpen = openIds.has(item.id)}
        <div class="faq-item" class:faq-item--open={isOpen}>
          <button
            type="button"
            class="faq-trigger"
            aria-expanded={isOpen}
            onclick={() => toggle(item.id)}
          >
            <span class="faq-question">{item.question}</span>
            <svg
              class="faq-chevron"
              class:rotated={isOpen}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {#if isOpen}
            <div class="faq-answer">
              <p>{item.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .faq-page {
    min-height: 100%;
  }

  .page-header {
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($indigo, 50)});
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
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    overflow: hidden;
  }

  .faq-item {
    border-bottom: 1px solid map.get($border, default);

    &:last-child {
      border-bottom: none;
    }

    &--open {
      background: map.get($bg, muted);
    }
  }

  .faq-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1.25rem 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background map.get($transition, fast);

    &:hover {
      background: map.get($bg, muted);
    }
  }

  .faq-question {
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
    line-height: map.get($line-height, snug);
  }

  .faq-chevron {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: map.get($text, muted);
    transition: transform map.get($transition, base);

    &.rotated {
      transform: rotate(180deg);
    }
  }

  .faq-answer {
    padding: 0 1.5rem 1.25rem;

    p {
      font-size: map.get($font-size, base);
      color: map.get($text, secondary);
      line-height: map.get($line-height, relaxed);
      margin: 0;
      white-space: pre-wrap;
    }
  }
</style>
