<script lang="ts">
  import type { IconTextButtonProps } from '../model'
  import { resolveIconColor } from '../lib/iconColor'
  import { ICONS } from '../../Icons/config/icons'

  let {
    icon,
    label,
    variant,
    iconColor,
    htmlType = 'button',
    onclick,
    width,
    height,
    'aria-expanded': ariaExpanded,
  }: IconTextButtonProps = $props()

  const IconComponent = $derived(ICONS[icon])
  const resolvedIconColor = $derived(resolveIconColor(variant, iconColor))
</script>

<button
  class="button"
  data-variant={variant}
  data-content="icon-text"
  type={htmlType}
  aria-expanded={ariaExpanded}
  {onclick}
  style:width={width ? `${width}px` : 'auto'}
  style:height={height ? `${height}px` : '40px'}
>
  <IconComponent size={20} color={resolvedIconColor} />
  {label}
</button>

<style lang="scss">
  @use '../scss/button';

  .button {
    @include button.styles;
  }
</style>
