<script lang="ts">
  import type {
    ButtonProps,
    TextButtonProps,
    IconButtonProps,
    IconTextButtonProps,
    LinkButtonProps,
  } from './model'
  import ButtonElement from './ui/ButtonElement.svelte'
  import IconButton from './ui/IconButton.svelte'
  import IconTextButton from './ui/IconTextButton.svelte'
  import LinkButton from './ui/LinkButton.svelte'

  // svelte-ignore custom_element_props_identifier
  const props: ButtonProps = $props()
</script>

{#if props.type === 'link-button'}
  {@const p = props as LinkButtonProps}
  <LinkButton
    type="link-button"
    label={p.label}
    variant={p.variant}
    href={p.href}
    onclick={p.onclick}
    width={p.width}
    height={p.height}
    aria-expanded={p['aria-expanded']}
  />
{:else if props.type === 'icon'}
  {@const p = props as IconButtonProps}
  <IconButton
    type="icon"
    icon={p.icon}
    variant={p.variant}
    aria-label={p['aria-label']}
    iconColor={p.iconColor}
    htmlType={p.htmlType}
    onclick={p.onclick}
    width={p.width}
    height={p.height}
    aria-expanded={p['aria-expanded']}
  />
{:else if props.type === 'icon-text'}
  {@const p = props as IconTextButtonProps}
  <IconTextButton
    type="icon-text"
    icon={p.icon}
    label={p.label}
    variant={p.variant}
    iconColor={p.iconColor}
    htmlType={p.htmlType}
    onclick={p.onclick}
    width={p.width}
    height={p.height}
    aria-expanded={p['aria-expanded']}
  />
{:else}
  {@const p = props as TextButtonProps}
  <ButtonElement
    type="text"
    label={p.label}
    variant={p.variant}
    htmlType={p.htmlType}
    onclick={p.onclick}
    width={p.width}
    height={p.height}
    aria-expanded={p['aria-expanded']}
  />
{/if}
