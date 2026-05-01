<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import type { InputChangeDetail, InputProps } from './model/index'

  const dispatch = createEventDispatcher<{
    blur: InputChangeDetail
  }>()

  let {
    id,
    name,
    value,
    type,
    placeholder,
    label,
    error,
    disabled = false,
    required,
  }: InputProps = $props()

  /** blur 時の値をトリムして blur を発火する。 */
  const handleBlur = (event: FocusEvent) => {
    const target = event.currentTarget as HTMLInputElement | undefined

    if (!target) return

    const nextValue = target.value.trim()
    target.value = nextValue
    dispatch('blur', { value: nextValue })
  }
</script>

<div class="input-wrapper">
  <label class="input-label" for={id}>
    {label}
    {#if required}<span class="input-required" aria-hidden="true">*</span>{/if}
  </label>
  <input
    class="input-field"
    {id}
    {name}
    {type}
    {placeholder}
    {value}
    {disabled}
    {required}
    onblur={handleBlur}
    aria-describedby={error ? `${id}-error` : undefined}
    aria-invalid={error ? 'true' : undefined}
  />
  {#if error}
    <p class="input-error" id="{id}-error" role="alert">{error}</p>
  {/if}
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  /* #region Layout */
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  /* #endregion */

  /* #region Label */
  .input-label {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
  }

  .input-required {
    color: map.get(t.$error, 500);
    margin-left: 0.25rem;
  }

  /* #endregion */

  /* #region Field */
  .input-field {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, primary);
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, md);
    transition:
      border-color map.get(t.$transition, fast),
      box-shadow map.get(t.$transition, fast);
    outline: none;

    &::placeholder {
      color: map.get(t.$text, muted);
    }

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

  /* #endregion */

  /* #region Error */
  .input-error {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$error, 500);
    margin: 0;
  }

  /* #endregion */
</style>
