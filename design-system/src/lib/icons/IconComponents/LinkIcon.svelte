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
  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
</svg>
