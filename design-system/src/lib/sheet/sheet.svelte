<script lang="ts">
  import type { Snippet } from 'svelte'

  interface SheetProps {
    /** シートの開閉状態。`$bindable` @default false */
    open?: boolean
    /**
     * シートが開く方向
     * - `left`: 左からスライドイン
     * - `right`: 右からスライドイン
     * - `bottom`: 下からスライドイン
     * @default 'left'
     */
    side?: 'left' | 'right' | 'bottom'
    /** 追加 CSS クラス */
    class?: string
    /** シート内に描画するコンテンツ */
    children: Snippet
    /** シートが閉じられた時に呼ばれるコールバック */
    onClose?: () => void
  }

  let {
    open = $bindable(false),
    side = 'left',
    class: className = '',
    children,
    onClose,
  }: SheetProps = $props()

  function close() {
    open = false
    onClose?.()
  }

  function handleBackdropClick() {
    close()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      close()
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div class="sheet-backdrop" onclick={handleBackdropClick} aria-hidden="true"></div>
  <div class="sheet sheet--{side} {className}" role="dialog" aria-modal="true">
    <button class="sheet-close" type="button" aria-label="閉じる" onclick={close}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
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
    animation: fadeIn map.get(t.$transition, fast) ease;
  }

  .sheet {
    position: fixed;
    background: map.get(t.$bg, surface);
    z-index: #{map.get(t.$z, modal)};
    overflow-y: auto;
    animation: slideIn map.get(t.$transition, base) ease;

    &--left {
      top: 0;
      left: 0;
      bottom: 0;
      width: min(320px, 80vw);
      padding: 1.5rem;
      box-shadow: map.get(t.$shadow, xl);
    }

    &--right {
      top: 0;
      right: 0;
      bottom: 0;
      width: min(320px, 80vw);
      padding: 1.5rem;
      box-shadow: map.get(t.$shadow, xl);
    }

    &--bottom {
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 90vh;
      padding: 1.5rem;
      border-radius: map.get(t.$radius, xl) map.get(t.$radius, xl) 0 0;
      box-shadow: map.get(t.$shadow, xl);
    }
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

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
