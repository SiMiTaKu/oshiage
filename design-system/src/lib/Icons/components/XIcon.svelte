<script lang="ts">
  import { getIconColor } from '../model/colors'
  import type { IconProps } from '../model/props'

  let { size, color, 'aria-label': ariaLabel = undefined }: IconProps = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={getIconColor(color)}
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  role={ariaLabel ? 'img' : undefined}
  aria-label={ariaLabel}
>
  <line x1="18"
y1="6"
x2="6"
y2="18" />
  <line x1="6"
y1="6"
x2="18"
y2="18" />
</svg>
