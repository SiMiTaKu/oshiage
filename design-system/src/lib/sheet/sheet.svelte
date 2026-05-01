<script lang="ts">
  import XIcon from '../icons/icon-components/XIcon.svelte'
  import type { SheetProps } from './model/index'

  let { side = 'left', children, onClose }: SheetProps = $props()
  let isOpen = $state(true)

  /** シートを閉じる。 */
  const closeSheet = () => {
    isOpen = false
    onClose?.()
  }

  /** バックドロップ押下でシートを閉じる。 */
  const closeSheetByBackdrop = () => closeSheet()

  /** Escape キー押下時にシートを閉じる。 */
  const closeSheetByEscape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return

    closeSheet()
  }
</script>

<svelte:window onkeydown={closeSheetByEscape} />

{#if isOpen}
  <div class="sheet-backdrop" onclick={closeSheetByBackdrop} aria-hidden="true"></div>
  <div class="sheet" data-side={side} role="dialog" aria-modal="true">
    <button class="sheet-close" type="button" aria-label="閉じる" onclick={closeSheet}>
      <XIcon color="gray" size={20} />
    </button>
    {@render children()}
  </div>
{/if}

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .sheet-backdrop {
    position: fixed;
    inset: 0;
    background: map.get(t.$bg, overlay);
    z-index: #{map.get(t.$z, overlay)};
    animation: fadeInSheetBackdrop map.get(t.$transition, fast) ease;
  }

  .sheet {
    position: fixed;
    background: map.get(t.$bg, surface);
    z-index: #{map.get(t.$z, modal)};
    overflow-y: auto;
  }

  .sheet[data-side='left'] {
    top: 0;
    left: 0;
    bottom: 0;
    width: min(320px, 80vw);
    padding: 1.5rem;
    box-shadow: map.get(t.$shadow, xl);
    animation: slideInSheetFromLeft map.get(t.$transition, base) ease;
  }

  .sheet[data-side='right'] {
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 80vw);
    padding: 1.5rem;
    box-shadow: map.get(t.$shadow, xl);
    animation: slideInSheetFromRight map.get(t.$transition, base) ease;
  }

  .sheet[data-side='bottom'] {
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 90vh;
    padding: 1.5rem;
    border-radius: map.get(t.$radius, xl) map.get(t.$radius, xl) 0 0;
    box-shadow: map.get(t.$shadow, xl);
    animation: slideInSheetFromBottom map.get(t.$transition, base) ease;
  }

  .sheet-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: map.get(t.$text, muted);
    border-radius: map.get(t.$radius, sm);
    transition:
      color map.get(t.$transition, fast),
      background map.get(t.$transition, fast);
    display: flex;
    align-items: center;

    &:hover {
      color: map.get(t.$text, primary);
      background: map.get(t.$bg, muted);
    }

    &:focus-visible {
      outline: 2px solid map.get(t.$border, focus);
      outline-offset: 2px;
    }
  }

  @keyframes fadeInSheetBackdrop {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes slideInSheetFromLeft {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInSheetFromRight {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInSheetFromBottom {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }
</style>
