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
  <line x1="8"
y1="6"
x2="21"
y2="6" />
  <line x1="8"
y1="12"
x2="21"
y2="12" />
  <line x1="8"
y1="18"
x2="21"
y2="18" />
  <line x1="3"
y1="6"
x2="3.01"
y2="6" />
  <line x1="3"
y1="12"
x2="3.01"
y2="12" />
  <line x1="3"
y1="18"
x2="3.01"
y2="18" />
</svg>
