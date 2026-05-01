<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import ChevronDownIcon from '../icons/icon-components/ChevronDownIcon.svelte'
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
  @use 'tokens' as t;

  /* #region Layout */
  .select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  /* #endregion */

  /* #region Label */
  .select-label {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
  }

  .select-required {
    color: map.get(t.$error, 500);
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
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, primary);
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, md);
    appearance: none;
    cursor: pointer;
    outline: none;
    transition:
      border-color map.get(t.$transition, fast),
      box-shadow map.get(t.$transition, fast);

    &:focus {
      border-color: map.get(t.$border, focus);
      box-shadow: 0 0 0 3px #{map.get(t.$indigo, 100)};
    }

    &[aria-invalid='true'] {
      border-color: map.get(t.$error, 500);
    }

    &[aria-invalid='true']:focus {
      box-shadow: 0 0 0 3px #{map.get(t.$error, 100)};
    }

    &:disabled {
      background: map.get(t.$bg, muted);
      color: map.get(t.$text, disabled);
      cursor: not-allowed;
    }
  }

  .select-chevron {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: map.get(t.$text, muted);
    display: flex;
    align-items: center;
  }

  /* #endregion */

  /* #region Error */
  .select-error {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$error, 500);
    margin: 0;
  }

  /* #endregion */
</style>
