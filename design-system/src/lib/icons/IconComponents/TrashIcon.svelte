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
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v6M14 11v6" />
  <path d="M9 6V4h6v2" />
</svg>
