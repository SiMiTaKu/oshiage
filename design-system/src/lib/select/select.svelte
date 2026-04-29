<script lang="ts">
  import type { Snippet } from 'svelte'

  interface SelectProps {
    /** select 要素の id。label の `for` と紐付けるために使用 */
    id?: string
    /** フォーム送信時のフィールド名 */
    name?: string
    /** 選択中の値。`$bindable` @default '' */
    value?: string
    /** select の上部に表示するラベルテキスト */
    label?: string
    /** 補助説明テキスト。error が無い場合のみ表示される */
    hint?: string
    /** バリデーションエラーメッセージ。指定するとエラースタイルが適用される */
    error?: string
    /** 操作不可にするか @default false */
    disabled?: boolean
    /** 必須フィールドとするか。ラベルに * が付与される @default false */
    required?: boolean
    /** 未選択時に表示するプレースホルダーテキスト */
    placeholder?: string
    /** 追加 CSS クラス */
    class?: string
    /** `<option>` 要素群を含む Snippet */
    children: Snippet
  }

  let {
    id,
    name,
    value = $bindable(''),
    label,
    hint,
    error,
    disabled = false,
    required = false,
    placeholder,
    class: className = '',
    children,
  }: SelectProps = $props()
</script>

<div class="select-wrapper {className}">
  {#if label}
    <label class="select-label" for={id}>
      {label}
      {#if required}<span class="select-required" aria-hidden="true">*</span>{/if}
    </label>
  {/if}
  <div class="select-container">
    <select
      class="select-field"
      class:select-field--error={!!error}
      {id}
      {name}
      {disabled}
      {required}
      bind:value
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      aria-invalid={error ? 'true' : undefined}
    >
      {#if placeholder}
        <option value="" disabled selected hidden>{placeholder}</option>
      {/if}
      {@render children()}
    </select>
    <span class="select-chevron" aria-hidden="true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  </div>
  {#if error}
    <p class="select-error" id="{id}-error" role="alert">{error}</p>
  {:else if hint}
    <p class="select-hint" id="{id}-hint">{hint}</p>
  {/if}
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .select-label {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
  }

  .select-required {
    color: map.get(t.$error, 500);
    margin-left: 0.25rem;
  }

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

    &:disabled {
      background: map.get(t.$bg, muted);
      color: map.get(t.$text, disabled);
      cursor: not-allowed;
    }

    &--error {
      border-color: map.get(t.$error, 500);

      &:focus {
        box-shadow: 0 0 0 3px #{map.get(t.$error, 100)};
      }
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

  .select-hint {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .select-error {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$error, 500);
    margin: 0;
  }
</style>
