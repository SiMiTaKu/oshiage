<script lang="ts">
  import type { BadgeProps } from './model/index'

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
    gap: 4px;
    padding: 3px 11px;
    font-size: map.get($font-size, xs);
    font-weight: map.get($font-weight, semibold);
    border: 1px solid transparent;
    border-radius: map.get($radius, full);
    align-items: center;
    line-height: map.get($line-height, normal);
    white-space: nowrap;
  }

  /* #endregion */

  /* #region Variants */
  .badge[data-variant='primary'] {
    color: map.get($text, inverse);
    background: map.get($brand, 500);
  }

  .badge[data-variant='secondary'] {
    color: map.get($indigo, 700);
    background: map.get($indigo, 100);
  }

  .badge[data-variant='primary-outline'] {
    color: map.get($brand, 700);
    border-color: rgba(map.get($brand, 500), 0.2);
    background: rgba(map.get($brand, 100), 0.56);
  }

  .badge[data-variant='secondary-outline'] {
    color: map.get($indigo, 700);
    border-color: rgba(map.get($indigo, 500), 0.24);
    background: transparent;
  }

  .badge[data-variant='destructive'] {
    color: map.get($error, 500);
    background: map.get($error, 100);
  }

  .badge[data-variant='success'] {
    color: map.get($success, 500);
    background: map.get($success, 100);
  }

  .badge[data-variant='warning'] {
    color: map.get($warning, 500);
    background: map.get($warning, 100);
  }

  /* #endregion */
</style>
