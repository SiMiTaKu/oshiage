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
  @use '../../styles/index' as *;

  /* #region Layout */
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* #endregion */

  /* #region Label */
  .input-label {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
  }

  .input-required {
    color: map.get($error, 500);
  }

  /* #endregion */

  /* #region Field */
  .input-field {
    width: 100%;
    padding: 8px 12px;
    font-size: map.get($font-size, base);
    color: map.get($text, primary);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, md);
    background: map.get($bg, surface);
    transition:
      border-color map.get($transition, fast),
      box-shadow map.get($transition, fast);
    outline: none;

    &::placeholder {
      color: map.get($text, muted);
    }

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

  /* #endregion */

  /* #region Error */
  .input-error {
    font-size: map.get($font-size, xs);
    color: map.get($error, 500);
  }

  /* #endregion */
</style>
