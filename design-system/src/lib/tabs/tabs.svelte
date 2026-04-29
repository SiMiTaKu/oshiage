<script lang="ts">
  import type { Snippet } from 'svelte'

  interface TabsProps {
    /** 現在アクティブなタブの ID。`$bindable` @default '' */
    activeTab?: string
    /** 追加 CSS クラス */
    class?: string
    /** `<TabsRoot>` などのタブコンテンツを含む Snippet */
    children: Snippet
  }

  let { activeTab = $bindable(''), class: className = '', children }: TabsProps = $props()
</script>

<div class="tabs {className}">
  {@render children()}
</div>

<style lang="scss">
  .tabs {
    width: 100%;
  }
</style>
