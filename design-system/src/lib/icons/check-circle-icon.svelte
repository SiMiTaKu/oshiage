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
  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  <path d="M9 12l2 2 4-4" />
</svg>
