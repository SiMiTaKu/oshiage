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
  <circle cx="12" cy="8" r="4" />
  <path d="M6 20v-2a6 6 0 0112 0v2" />
</svg>
