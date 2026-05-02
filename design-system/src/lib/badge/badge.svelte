<script lang="ts">
  import type { BadgeProps } from './Model/index'

  let { variant, text }: BadgeProps = $props()
</script>

<span class="badge" data-variant={variant}>
  {text}
</span>

<style lang="scss">
  @use 'sass:map';
  @use '../../styles/index' as *;

  /* #region Root */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.1875rem 0.6875rem;
    border-radius: map.get($radius, full);
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    line-height: map.get($line-height, normal);
    border: 1px solid transparent;
    white-space: nowrap;
  }

  /* #endregion */

  /* #region Variants */
  .badge[data-variant='primary'] {
    background: map.get($brand, 500);
    color: map.get($text, inverse);
  }

  .badge[data-variant='secondary'] {
    background: map.get($indigo, 100);
    color: map.get($indigo, 700);
  }

  .badge[data-variant='primary-outline'] {
    background: rgba(map.get($brand, 100), 0.56);
    color: map.get($brand, 700);
    border-color: rgba(map.get($brand, 500), 0.2);
  }

  .badge[data-variant='secondary-outline'] {
    background: transparent;
    color: map.get($indigo, 700);
    border-color: rgba(map.get($indigo, 500), 0.24);
  }

  .badge[data-variant='destructive'] {
    background: map.get($error, 100);
    color: map.get($error, 500);
  }

  .badge[data-variant='success'] {
    background: map.get($success, 100);
    color: map.get($success, 500);
  }

  .badge[data-variant='warning'] {
    background: map.get($warning, 100);
    color: map.get($warning, 500);
  }

  /* #endregion */
</style>
