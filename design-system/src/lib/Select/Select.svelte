<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import ChevronDownIcon from '../Icons/IconComponents/ChevronDownIcon.svelte'
  import type { SelectChangeDetail, SelectProps } from './Model/index'

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
    gap: 0.375rem;
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
    margin-left: 0.25rem;
  }

  /* #endregion */

  /* #region Field */
  .select-container {
    position: relative;
  }

  .select-field {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 0.75rem;
    font-size: map.get($font-size, base);
    color: map.get($text, primary);
    background: map.get($bg, surface);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    appearance: none;
    cursor: pointer;
    outline: none;
    transition:
      border-color map.get($transition, fast),
      box-shadow map.get($transition, fast);

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
      background: map.get($bg, muted);
      color: map.get($text, disabled);
      cursor: not-allowed;
    }
  }

  .select-chevron {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: map.get($text, muted);
    display: flex;
    align-items: center;
  }

  /* #endregion */

  /* #region Error */
  .select-error {
    font-size: map.get($font-size, xs);
    color: map.get($error, 500);
    margin: 0;
  }

  /* #endregion */
</style>
