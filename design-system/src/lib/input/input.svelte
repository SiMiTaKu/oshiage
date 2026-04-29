<script lang="ts">
  interface InputProps {
    /** input 要素の id。label の `for` と紐付けるために使用 */
    id?: string
    /** フォーム送信時のフィールド名 */
    name?: string
    /** 入力値。`$bindable` @default '' */
    value?: string
    /**
     * input の type 属性
     * @default 'text'
     */
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
    /** プレースホルダーテキスト @default '' */
    placeholder?: string
    /** input の上部に表示するラベルテキスト */
    label?: string
    /** 補助説明テキスト。error が無い場合のみ表示される */
    hint?: string
    /** バリデーションエラーメッセージ。指定するとエラースタイルが適用される */
    error?: string
    /** 操作不可にするか @default false */
    disabled?: boolean
    /** 必須フィールドとするか。ラベルに * が付与される @default false */
    required?: boolean
    /** 追加 CSS クラス */
    class?: string
  }

  let {
    id,
    name,
    value = $bindable(''),
    type = 'text',
    placeholder = '',
    label,
    hint,
    error,
    disabled = false,
    required = false,
    class: className = '',
  }: InputProps = $props()

  function handleBlur() {
    if (typeof value === 'string') {
      value = value.trim()
    }
  }
</script>

<div class="input-wrapper {className}">
  {#if label}
    <label class="input-label" for={id}>
      {label}
      {#if required}<span class="input-required" aria-hidden="true">*</span>{/if}
    </label>
  {/if}
  <input
    class="input-field"
    class:input-field--error={!!error}
    {id}
    {name}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    onblur={handleBlur}
    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
    aria-invalid={error ? 'true' : undefined}
  />
  {#if error}
    <p class="input-error" id="{id}-error" role="alert">{error}</p>
  {:else if hint}
    <p class="input-hint" id="{id}-hint">{hint}</p>
  {/if}
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .input-label {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
  }

  .input-required {
    color: map.get(t.$error, 500);
    margin-left: 0.25rem;
  }

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

  .input-hint {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .input-error {
    font-size: map.get(t.$font-size, xs);
    color: map.get(t.$error, 500);
    margin: 0;
  }
</style>
