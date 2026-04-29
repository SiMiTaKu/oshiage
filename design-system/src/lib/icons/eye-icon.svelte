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
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
  <circle cx="12" cy="12" r="3" />
</svg>
