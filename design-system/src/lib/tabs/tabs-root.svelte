<script lang="ts">
  import type { Snippet } from 'svelte'

  interface TabItem {
    /** タブの一意 ID。パネルと紐付けるキー */
    id: string
    /** タブバーに表示するラベルテキスト */
    label: string
  }

  interface TabsRootProps {
    /** 表示するタブの配列 */
    tabs: TabItem[]
    /** 現在アクティブなタブの ID。`$bindable` @default '' */
    activeTab?: string
    /** 追加 CSS クラス */
    class?: string
    /** タブ ID をキーとしたパネルコンテンツの Snippet マップ */
    panelChildren?: Record<string, Snippet>
  }

  let {
    tabs,
    activeTab = $bindable(''),
    class: className = '',
    panelChildren,
  }: TabsRootProps = $props()

  function select(id: string) {
    activeTab = id
  }
</script>

<div class="tabs-root {className}">
  <div class="tabs-list" role="tablist">
    {#each tabs as tab (tab.id)}
      <button
        class="tabs-trigger"
        class:tabs-trigger--active={activeTab === tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-controls="panel-{tab.id}"
        id="tab-{tab.id}"
        tabindex={activeTab === tab.id ? 0 : -1}
        onclick={() => select(tab.id)}
        type="button"
      >
        {tab.label}
      </button>
    {/each}
  </div>
  {#if panelChildren}
    {#each tabs as tab (tab.id)}
      <div
        class="tabs-panel"
        class:tabs-panel--active={activeTab === tab.id}
        role="tabpanel"
        id="panel-{tab.id}"
        aria-labelledby="tab-{tab.id}"
        hidden={activeTab !== tab.id}
      >
        {#if panelChildren[tab.id]}
          {@render panelChildren[tab.id]()}
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .tabs-root {
    width: 100%;
  }

  .tabs-list {
    display: flex;
    border-bottom: 2px solid map.get(t.$border, default);
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tabs-trigger {
    flex-shrink: 0;
    padding: 0.625rem 1rem;
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    transition:
      color map.get(t.$transition, fast),
      border-color map.get(t.$transition, fast);
    white-space: nowrap;

    &:hover {
      color: map.get(t.$text, primary);
    }

    &:focus-visible {
      outline: 2px solid map.get(t.$border, focus);
      outline-offset: -2px;
    }

    &--active {
      color: map.get(t.$brand, 500);
      border-bottom-color: map.get(t.$brand, 500);
    }
  }

  .tabs-panel {
    padding-top: 1rem;

    &:not(.tabs-panel--active) {
      display: none;
    }
  }
</style>
