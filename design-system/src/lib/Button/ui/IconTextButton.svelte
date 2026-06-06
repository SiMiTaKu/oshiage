<script lang="ts">
  import type { IconTextButtonProps } from '../Model'
  import { resolveIconColor } from '../lib/iconColor'

  let {
    icon: Icon,
    label,
    variant,
    iconColor,
    htmlType = 'button',
    onclick,
    width,
    height,
  }: IconTextButtonProps = $props()

  const resolvedIconColor = $derived(resolveIconColor(variant, iconColor))
</script>

<button
  class="button"
  data-variant={variant}
  data-content="icon-text"
  type={htmlType}
  {onclick}
  style:width={width ? `${width}px` : 'auto'}
  style:height={height ? `${height}px` : '40px'}
>
  <Icon size={20} color={resolvedIconColor} />
  {label}
</button>

<style lang="scss">
  @use '../scss/button';
  @include button.styles;
</style>
