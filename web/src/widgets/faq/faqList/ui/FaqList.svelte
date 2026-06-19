<script lang="ts">
  import { FAQ_ITEMS } from '../../config/faqPageConfig'

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

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

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
  }

  .faq-item--open {
    border-bottom: 1px solid map.get($border, default);
    background: map.get($bg, muted);
  }

  .faq-trigger {
    display: flex;
    gap: 16px;
    width: 100%;
    padding: 20px 24px;
    border: none;
    background: transparent;
    transition: background map.get($transition, fast);
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    text-align: left;

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
    padding: 0 24px 20px;

    p {
      font-size: map.get($font-size, base);
      color: map.get($text, secondary);
      line-height: map.get($line-height, relaxed);
      white-space: pre-wrap;
    }
  }
</style>
