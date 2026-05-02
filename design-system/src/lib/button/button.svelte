<script lang="ts">
  import type { ButtonProps } from './Model/index'

  let { label, variant, type = 'button' }: ButtonProps = $props()
</script>

<button class="button" data-variant={variant} {type}>{label}</button>

<style lang="scss">
  @use 'sass:map';
  @use '../../styles/index' as *;

  /* #region Root */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 700;
    transition:
      transform 160ms ease,
      background-color 160ms ease,
      color 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
    cursor: pointer;
    box-shadow: map.get($shadow, sm);
  }

  /* #endregion */

  .button:hover {
    transform: translateY(-1px);
  }

  .button:focus-visible {
    outline: 2px solid rgba(map.get($brand, 500), 0.28);
    outline-offset: 2px;
  }

  /* #region Variants */
  .button[data-variant='primary'] {
    background: linear-gradient(135deg, map.get($brand, 500) 0%, map.get($brand, 600) 100%);
    color: map.get($text, inverse);
  }

  .button[data-variant='primary-outline'] {
    background: rgba(map.get($brand, 100), 0.44);
    color: map.get($brand, 700);
    border-color: rgba(map.get($brand, 500), 0.24);
  }

  .button[data-variant='secondary'] {
    background: linear-gradient(135deg, map.get($indigo, 500) 0%, map.get($indigo, 700) 100%);
    color: map.get($text, inverse);
  }

  .button[data-variant='secondary-outline'] {
    background: rgba(map.get($indigo, 100), 0.52);
    color: map.get($indigo, 700);
    border-color: rgba(map.get($indigo, 500), 0.24);
  }

  /* #endregion */

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }
</style>
