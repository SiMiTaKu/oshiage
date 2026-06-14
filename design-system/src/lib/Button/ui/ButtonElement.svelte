<script lang="ts">
  import type { TextButtonProps } from '../model'

  let { label, variant, htmlType = 'button', onclick, width, height }: TextButtonProps = $props()
</script>

<button
  class="button"
  data-variant={variant}
  data-content="text"
  type={htmlType}
  {onclick}
  style:width={width ? `${width}px` : 'auto'}
  style:height={height ? `${height}px` : '40px'}
>
  {label}
</button>

<style lang="scss">
  @use '../scss/button';

  .button {
    @include button.styles;
  }
</style>
