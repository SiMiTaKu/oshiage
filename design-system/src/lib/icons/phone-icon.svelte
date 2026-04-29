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
  <path
    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.78 19.79 19.79 0 01.08 1.17 2 2 0 012.07.01h3a2 2 0 012 1.72c.128 1.014.38 2.01.75 2.96a2 2 0 01-.45 2.11L6.09 8.09a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.95.37 1.946.622 2.96.75A2 2 0 0122 16.92z"
  />
</svg>
