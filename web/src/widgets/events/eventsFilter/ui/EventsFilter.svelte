<script lang="ts">
  import { EVENT_TYPE_OPTIONS } from '../../config/eventsPageConfig'

  let {
    selectedType = $bindable(''),
    onchange,
  }: {
    selectedType: string
    onchange: () => void
  } = $props()
</script>

<div class="filters">
  <div class="filter-group">
    <label class="filter-label" for="event-type">種別</label>
    <select id="event-type"
class="filter-select"
bind:value={selectedType}
{onchange}>
      {#each EVENT_TYPE_OPTIONS as opt, index (index)}
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
      box-shadow: 0 0 0 3px #{map.get($indigo, 100)};
    }
  }
</style>
