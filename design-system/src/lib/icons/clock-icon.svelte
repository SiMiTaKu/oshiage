<script lang="ts">
  import type { IconProps } from './props'

  let {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    class: className = '',
    'aria-label': ariaLabel = undefined,
    'aria-hidden': ariaHidden = true,
  }: IconProps = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  role={ariaLabel ? 'img' : undefined}
  aria-label={ariaLabel}
  aria-hidden={ariaLabel ? undefined : ariaHidden}
>
  <circle cx="12" cy="12" r="10" />
  <polyline points="12 6 12 12 16 14" />
</svg>
