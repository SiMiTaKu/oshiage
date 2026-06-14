<script lang="ts">
  import type { LinkButtonProps } from '../model'

  let {
    label,
    variant,
    href,
    onclick,
    width,
    height,
    'aria-expanded': ariaExpanded,
  }: LinkButtonProps = $props()
</script>

<a
  class="button"
  data-variant={variant}
  data-content="text"
  {href}
  aria-expanded={ariaExpanded}
  {onclick}
  style:width={width ? `${width}px` : 'auto'}
  style:height={height ? `${height}px` : '40px'}
>
  {label}
</a>

<style lang="scss">
  @use '../scss/button';

  .button {
    @include button.styles;
  }
</style>
