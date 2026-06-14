<script lang="ts">
  import { ICONS, type IconName } from './config/icons'
  import type { IconColor } from './model/props'

  interface IconsGalleryProps {
    /** 表示するアイコンの名前（指定した場合はそのアイコンのみ表示） */
    name?: IconName
    /** アイコンサイズ。 */
    size?: number
    /** アイコン色。 */
    color?: IconColor
  }

  let { name, size = 24, color = 'primary' }: IconsGalleryProps = $props()

  const TargetIcon = $derived(name ? ICONS[name] : null)
</script>

{#if TargetIcon}
  <TargetIcon {size} {color} />
{:else if !name}
  <div class="icons-grid">
    {#each Object.entries(ICONS) as [iconName, Icon] (iconName)}
      <div class="icon-card">
        <Icon {size} {color} />
        <span>{iconName}</span>
      </div>
    {/each}
  </div>
{/if}

<style>
  .icons-grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    width: min(960px, 92vw);
  }

  .icon-card {
    display: flex;
    gap: 8px;
    min-height: 96px;
    padding: 12px;
    border: 1px solid rgb(30, 27, 75, 0.08);
    border-radius: 8px;
    background: #fff;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .icon-card span {
    font-size: 12px;
    color: #4338ca;
    text-align: center;
    line-height: 1.2;
  }
</style>
