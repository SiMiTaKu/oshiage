<script lang="ts">
  import ChevronDownIcon from '../Icons/components/ChevronDownIcon.svelte'
  import type { AccordionProps } from './model/index'
  import { createAccordionName } from './lib/generate-accordion-name'

  let { id, items }: AccordionProps = $props()

  /** 一意のアコーディオン名 */
  const accordionName = $derived(createAccordionName(id))

  let itemElements = $state<HTMLDetailsElement[]>([])

  /** 開いた項目以外を閉じる。 */
  const handleToggle = (event: Event) => {
    const currentItem = event.currentTarget as HTMLDetailsElement | undefined

    if (!currentItem?.open) return

    itemElements.forEach((item) => {
      if (item === currentItem) {
        return
      }

      item.open = false
    })
  }
</script>

<div class="accordion">
  {#each items as item, index (`${accordionName}-${index}`)}
    {@const itemId = `${accordionName}-${index}`}
    <details
      bind:this={itemElements[index]}
      class="accordion-item"
      name={accordionName}
      ontoggle={handleToggle}
    >
      <summary class="accordion-summary" id={`summary-${itemId}`}>
        <span class="accordion-summaryText">{item.summary}</span>
        <span class="accordion-chevron" aria-hidden="true">
          <ChevronDownIcon color="secondary" size={18} />
        </span>
      </summary>
      <div class="accordion-panel" role="region" aria-labelledby={`summary-${itemId}`}>
        <div class="accordion-panelInner">
          <div class="accordion-details">
            {@render item.details()}
          </div>
        </div>
      </div>
    </details>
  {/each}
</div>

<style lang="scss">
  @use 'sass:map';
  @use '../../styles/index' as *;

  /* #region Root */
  .accordion {
    display: grid;
    gap: 12px;
    width: 100%;
  }

  /* #endregion */

  /* #region Item */
  .accordion-item {
    width: 100%;
    border: 1px solid rgba(map.get($brand, 500), 0.16);
    border-radius: map.get($radius, lg);
    overflow: hidden;
    background: linear-gradient(180deg, rgba(map.get($brand, 100), 0.8) 0%, #fff 100%);
    box-shadow: map.get($shadow, sm);
  }

  /* #endregion */

  /* #region Summary */
  .accordion-summary {
    display: flex;
    gap: 12px;
    width: 100%;
    padding: 16px 20px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    color: map.get($brand, 700);
    border: none;
    background: transparent;
    transition:
      background map.get($transition, fast),
      color map.get($transition, fast);
    list-style: none;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    text-align: left;

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      background: rgba(map.get($brand, 100), 0.72);
    }

    &:focus-visible {
      outline: 2px solid map.get($brand, 500);
      outline-offset: -4px;
    }
  }

  .accordion-summaryText {
    flex: 1;
  }

  .accordion-chevron {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform map.get($transition, base);
  }

  .accordion-item[open] .accordion-summary {
    color: map.get($brand, 800);
    background: rgba(map.get($brand, 100), 0.92);
  }

  .accordion-item[open] .accordion-chevron {
    transform: rotate(180deg);
  }

  /* #endregion */

  /* #region Panel */
  .accordion-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows map.get($transition, base);
  }

  .accordion-item[open] .accordion-panel {
    grid-template-rows: 1fr;
  }

  .accordion-panelInner {
    overflow: hidden;
  }

  .accordion-details {
    padding: 0 20px 16px;
    font-size: map.get($font-size, sm);
    color: map.get($text, secondary);
    line-height: map.get($line-height, relaxed);
    border-top: 1px solid rgba(map.get($brand, 500), 0.1);
  }

  /* #endregion */
</style>
