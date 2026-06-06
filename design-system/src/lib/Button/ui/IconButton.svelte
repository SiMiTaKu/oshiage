<script lang="ts">
  import type { IconButtonProps } from '../Model'
  import { resolveIconColor } from '../lib/iconColor'

  let {
    icon: Icon,
    variant,
    'aria-label': ariaLabel,
    iconColor,
    htmlType = 'button',
    onclick,
    width,
    height,
  }: IconButtonProps = $props()

  const resolvedIconColor = $derived(resolveIconColor(variant, iconColor))
</script>

<button
  class="button"
  data-variant={variant}
  data-content="icon"
  type={htmlType}
  aria-label={ariaLabel}
  {onclick}
  style:width={width ? `${width}px` : 'auto'}
  style:height={height ? `${height}px` : '40px'}
>
  <Icon size={20} color={resolvedIconColor} />
</button>

<style lang="scss">
  @use '../scss/button';
  @include button.styles;
</style>
