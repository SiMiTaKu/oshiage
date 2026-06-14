<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import ChevronDownIcon from '../Icons/components/ChevronDownIcon.svelte'
  import type { SelectChangeDetail, SelectProps } from './model/index'

  const dispatch = createEventDispatcher<{
    blur: SelectChangeDetail
  }>()

  let {
    id,
    name,
    value,
    label,
    error,
    disabled = false,
    required,
    placeholder,
    items,
  }: SelectProps = $props()

  /** フォーカス離脱時に現在値を通知する。 */
  const handleBlur = (event: FocusEvent) => {
    const target = event.currentTarget as HTMLSelectElement | undefined

    if (!target) return

    dispatch('blur', { value: target.value })
  }
</script>

<div class="select-wrapper">
  <label class="select-label" for={id}>
    {label}
    {#if required}<span class="select-required" aria-hidden="true">*</span>{/if}
  </label>
  <div class="select-container">
    <select
      class="select-field"
      {id}
      {name}
      {value}
      {disabled}
      {required}
      onblur={handleBlur}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={error ? 'true' : undefined}
    >
      <option value="" disabled={required}>{placeholder}</option>
      {#each items as item (item.value)}
        <option value={item.value}>{item.label}</option>
      {/each}
    </select>
    <span class="select-chevron" aria-hidden="true">
      <ChevronDownIcon color="gray" size={16} />
    </span>
  </div>
  {#if error}
    <p class="select-error" id="{id}-error" role="alert">{error}</p>
  {/if}
</div>

<style lang="scss">
  @use 'sass:map';
  @use '../../styles/index' as *;

  /* #region Layout */
  .select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* #endregion */

  /* #region Label */
  .select-label {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
  }

  .select-required {
    color: map.get($error, 500);
  }

  /* #endregion */

  /* #region Field */
  .select-container {
    position: relative;
  }

  .select-field {
    width: 100%;
    padding: 8px 40px 8px 12px;
    font-size: map.get($font-size, base);
    color: map.get($text, primary);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    transition:
      border-color map.get($transition, fast),
      box-shadow map.get($transition, fast);
    appearance: none;
    cursor: pointer;
    outline: none;

    &:focus {
      border-color: map.get($border, focus);
      box-shadow: 0 0 0 3px #{map.get($indigo, 100)};
    }

    &[aria-invalid='true'] {
      border-color: map.get($error, 500);
    }

    &[aria-invalid='true']:focus {
      box-shadow: 0 0 0 3px #{map.get($error, 100)};
    }

    &:disabled {
      color: map.get($text, disabled);
      background: map.get($bg, muted);
      cursor: not-allowed;
    }
  }

  .select-chevron {
    position: absolute;
    display: flex;
    color: map.get($text, muted);
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    align-items: center;
  }

  /* #endregion */

  /* #region Error */
  .select-error {
    font-size: map.get($font-size, xs);
    color: map.get($error, 500);
  }

  /* #endregion */
</style>
