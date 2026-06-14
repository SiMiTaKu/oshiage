<script lang="ts">
  import type { TabsProps } from './model/index'

  let { children }: TabsProps = $props()
</script>

<div class="tabs">
  {@render children()}
</div>

<style lang="scss">
  .tabs {
    width: 100%;
  }
</style>
