<script lang="ts">
  import XIcon from '../Icons/IconComponents/XIcon.svelte'
  import type { SheetProps } from './Model/index'

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
  @use '../../styles/index' as *;

  .sheet-backdrop {
    position: fixed;
    inset: 0;
    background: map.get($bg, overlay);
    z-index: #{map.get($z, overlay)};
    animation: fadeInSheetBackdrop map.get($transition, fast) ease;
  }

  .sheet {
    position: fixed;
    background: map.get($bg, surface);
    z-index: #{map.get($z, modal)};
    overflow-y: auto;
  }

  .sheet[data-side='left'] {
    top: 0;
    left: 0;
    bottom: 0;
    width: min(320px, 80vw);
    padding: 1.5rem;
    box-shadow: map.get($shadow, xl);
    animation: slideInSheetFromLeft map.get($transition, base) ease;
  }

  .sheet[data-side='right'] {
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 80vw);
    padding: 1.5rem;
    box-shadow: map.get($shadow, xl);
    animation: slideInSheetFromRight map.get($transition, base) ease;
  }

  .sheet[data-side='bottom'] {
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 90vh;
    padding: 1.5rem;
    border-radius: map.get($radius, xl) map.get($radius, xl) 0 0;
    box-shadow: map.get($shadow, xl);
    animation: slideInSheetFromBottom map.get($transition, base) ease;
  }

  .sheet-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: map.get($text, muted);
    border-radius: map.get($radius, sm);
    transition:
      color map.get($transition, fast),
      background map.get($transition, fast);
    display: flex;
    align-items: center;

    &:hover {
      color: map.get($text, primary);
      background: map.get($bg, muted);
    }

    &:focus-visible {
      outline: 2px solid map.get($border, focus);
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
