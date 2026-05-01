<script lang="ts">
  import type { BadgeProps } from './model/index'

  let { variant, text }: BadgeProps = $props()
</script>

<span class="badge" data-variant={variant}>
  {text}
</span>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  /* #region Root */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.1875rem 0.6875rem;
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);
    line-height: map.get(t.$line-height, normal);
    border: 1px solid transparent;
    white-space: nowrap;
  }

  /* #endregion */

  /* #region Variants */
  .badge[data-variant='primary'] {
    background: map.get(t.$brand, 500);
    color: map.get(t.$text, inverse);
  }

  .badge[data-variant='secondary'] {
    background: map.get(t.$indigo, 100);
    color: map.get(t.$indigo, 700);
  }

  .badge[data-variant='primary-outline'] {
    background: rgba(map.get(t.$brand, 100), 0.56);
    color: map.get(t.$brand, 700);
    border-color: rgba(map.get(t.$brand, 500), 0.2);
  }

  .badge[data-variant='secondary-outline'] {
    background: transparent;
    color: map.get(t.$indigo, 700);
    border-color: rgba(map.get(t.$indigo, 500), 0.24);
  }

  .badge[data-variant='destructive'] {
    background: map.get(t.$error, 100);
    color: map.get(t.$error, 500);
  }

  .badge[data-variant='success'] {
    background: map.get(t.$success, 100);
    color: map.get(t.$success, 500);
  }

  .badge[data-variant='warning'] {
    background: map.get(t.$warning, 100);
    color: map.get(t.$warning, 500);
  }

  /* #endregion */
</style>
