<script lang="ts">
  import { getIconColor } from '../Model/colors'
  import type { IconProps } from '../Model/props'

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
  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
  <polyline points="17 6 23 6 23 12" />
</svg>
