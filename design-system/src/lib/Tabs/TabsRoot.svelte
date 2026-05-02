<script lang="ts">
  import type { TabsRootProps } from './Model/index'

  let { tabs, panelChildren }: TabsRootProps = $props()

  let activeTab = $state('')

  /** タブ一覧変更時に有効な初期タブを補正する。 */
  $effect(() => {
    const hasActiveTab = tabs.some((tab) => tab.id === activeTab)

    if (hasActiveTab) {
      return
    }

    activeTab = tabs[0]?.id ?? ''
  })

  /** 指定タブを選択する。 */
  const selectTab = (id: string) => {
    activeTab = id
  }
</script>

<div class="tabs-root">
  <div class="tabs-list" role="tablist" aria-label="タブ一覧">
    {#each tabs as tab (tab.id)}
      <button
        class="tabs-trigger"
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-controls="panel-{tab.id}"
        id="tab-{tab.id}"
        tabindex={activeTab === tab.id ? 0 : -1}
        onclick={() => selectTab(tab.id)}
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
  @use '../../styles/index' as *;

  .tabs-root {
    width: 100%;
  }

  .tabs-list {
    display: flex;
    border-bottom: 2px solid map.get($border, default);
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
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    transition:
      color map.get($transition, fast),
      border-color map.get($transition, fast);
    white-space: nowrap;

    &:hover {
      color: map.get($text, primary);
    }

    &:focus-visible {
      outline: 2px solid map.get($border, focus);
      outline-offset: -2px;
    }

    &[aria-selected='true'] {
      color: map.get($brand, 500);
      border-bottom-color: map.get($brand, 500);
    }
  }

  .tabs-panel {
    padding-top: 1rem;

    &[hidden] {
      display: none;
    }
  }
</style>
