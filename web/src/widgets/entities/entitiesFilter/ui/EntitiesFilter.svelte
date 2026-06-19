<script lang="ts">
  import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../../config/entitiesPageConfig'

  let {
    selectedCategory = $bindable(''),
    selectedStatus = $bindable(''),
    onchange,
  }: {
    selectedCategory: string
    selectedStatus: string
    onchange: () => void
  } = $props()
</script>

<div class="filters">
  <div class="filter-group">
    <label class="filter-label" for="entity-category">種別</label>
    <select id="entity-category"
class="filter-select"
bind:value={selectedCategory}
{onchange}>
      {#each CATEGORY_OPTIONS as opt, index (index)}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  </div>
  <div class="filter-group">
    <label class="filter-label" for="entity-status">状態</label>
    <select id="entity-status"
class="filter-select"
bind:value={selectedStatus}
{onchange}>
      {#each STATUS_OPTIONS as opt, index (index)}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .filters {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .filter-label {
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
  }

  .filter-select {
    padding: 8px 32px 8px 12px;
    font-size: map.get($font-size, sm);
    color: map.get($text, primary);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: map.get($border, focus);
      box-shadow: 0 0 0 3px #{map.get($brand, 100)};
    }
  }
</style>
