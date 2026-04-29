<script lang="ts">
  let {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    class: className = '',
    'aria-label': ariaLabel = undefined,
    'aria-hidden': ariaHidden = true,
  }: {
    size?: number
    color?: string
    strokeWidth?: number
    class?: string
    'aria-label'?: string
    'aria-hidden'?: boolean
  } = $props()
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
  <circle cx="18" cy="5" r="3" />
  <circle cx="6" cy="12" r="3" />
  <circle cx="18" cy="19" r="3" />
  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
</svg>
