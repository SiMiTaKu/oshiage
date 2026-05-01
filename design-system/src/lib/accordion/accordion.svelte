<script lang="ts">
  import ChevronDownIcon from '../icons/icon-components/ChevronDownIcon.svelte'
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
  @use 'tokens' as t;

  /* #region Root */
  .accordion {
    width: 100%;
    display: grid;
    gap: 0.75rem;
  }

  /* #endregion */

  /* #region Item */
  .accordion-item {
    width: 100%;
    border: 1px solid rgba(map.get(t.$brand, 500), 0.16);
    border-radius: map.get(t.$radius, lg);
    overflow: hidden;
    background: linear-gradient(180deg, rgba(map.get(t.$brand, 100), 0.8) 0%, #fff 100%);
    box-shadow: map.get(t.$shadow, sm);
  }

  /* #endregion */

  /* #region Summary */
  .accordion-summary {
    list-style: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    font-size: map.get(t.$font-size, base);
    font-weight: map.get(t.$font-weight, semibold);
    color: map.get(t.$brand, 700);
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition:
      background map.get(t.$transition, fast),
      color map.get(t.$transition, fast);

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      background: rgba(map.get(t.$brand, 100), 0.72);
    }

    &:focus-visible {
      outline: 2px solid map.get(t.$brand, 500);
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
    transition: transform map.get(t.$transition, base);
  }

  .accordion-item[open] .accordion-summary {
    color: map.get(t.$brand, 800);
    background: rgba(map.get(t.$brand, 100), 0.92);
  }

  .accordion-item[open] .accordion-chevron {
    transform: rotate(180deg);
  }

  /* #endregion */

  /* #region Panel */
  .accordion-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows map.get(t.$transition, base);
  }

  .accordion-item[open] .accordion-panel {
    grid-template-rows: 1fr;
  }

  .accordion-panelInner {
    overflow: hidden;
  }

  .accordion-details {
    padding: 0 1.25rem 1rem;
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, secondary);
    line-height: map.get(t.$line-height, relaxed);
    border-top: 1px solid rgba(map.get(t.$brand, 500), 0.1);
  }

  /* #endregion */
</style>
