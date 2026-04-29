<script lang="ts">
  import type { Snippet } from 'svelte'

  interface AccordionItem {
    /** アコーディオン項目の一意 ID */
    id: string
    /** アコーディオンヘッダーに表示するタイトル */
    title: string
    /** パネル内に描画する Snippet */
    content: Snippet
  }

  interface AccordionProps {
    /** 表示するアコーディオン項目の配列 */
    items: AccordionItem[]
    /** 複数のパネルを同時に開くことを許可するか @default false */
    allowMultiple?: boolean
    /** 追加 CSS クラス */
    class?: string
  }

  let { items, allowMultiple = false, class: className = '' }: AccordionProps = $props()

  let openIds = $state<Set<string>>(new Set())

  function toggle(id: string) {
    if (openIds.has(id)) {
      openIds.delete(id)
    } else {
      if (!allowMultiple) {
        openIds.clear()
      }
      openIds.add(id)
    }
    openIds = new Set(openIds)
  }
</script>

<div class="accordion {className}">
  {#each items as item (item.id)}
    {@const isOpen = openIds.has(item.id)}
    <div class="accordion-item" class:accordion-item--open={isOpen}>
      <button
        class="accordion-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="accordion-panel-{item.id}"
        id="accordion-header-{item.id}"
        onclick={() => toggle(item.id)}
      >
        <span class="accordion-title">{item.title}</span>
        <span class="accordion-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        class="accordion-panel"
        id="accordion-panel-{item.id}"
        aria-labelledby="accordion-header-{item.id}"
        role="region"
        hidden={!isOpen}
      >
        <div class="accordion-content">
          {@render item.content()}
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .accordion {
    width: 100%;
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, lg);
    overflow: hidden;
  }

  .accordion-item {
    border-bottom: 1px solid map.get(t.$border, default);

    &:last-child {
      border-bottom: none;
    }
  }

  .accordion-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    font-size: map.get(t.$font-size, base);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
    background: map.get(t.$bg, surface);
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background map.get(t.$transition, fast);

    &:hover {
      background: map.get(t.$bg, muted);
    }

    &:focus-visible {
      outline: 2px solid map.get(t.$border, focus);
      outline-offset: -2px;
    }
  }

  .accordion-title {
    flex: 1;
    margin-right: 0.5rem;
  }

  .accordion-icon {
    flex-shrink: 0;
    color: map.get(t.$text, muted);
    transition: transform map.get(t.$transition, base);

    .accordion-item--open & {
      transform: rotate(180deg);
    }
  }

  .accordion-panel {
    &:not([hidden]) {
      display: block;
    }
  }

  .accordion-content {
    padding: 0 1.25rem 1rem;
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, secondary);
    line-height: map.get(t.$line-height, relaxed);
  }
</style>
