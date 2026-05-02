<script lang="ts">
  import { ICON_GALLERY_ITEMS } from './Config/gallery-icons'
  import type { IconColor } from './Model/props'

  interface IconsGalleryProps {
    /** アイコンサイズ。 */
    size?: number
    /** アイコン色。 */
    color?: IconColor
  }

  let { size = 24, color = 'primary' }: IconsGalleryProps = $props()
</script>

<div class="icons-grid">
  {#each ICON_GALLERY_ITEMS as icon (icon.name)}
    {@const Icon = icon.component}
    <div class="icon-card">
      <Icon {size} {color} />
      <span>{icon.name}</span>
    </div>
  {/each}
</div>

<style>
  .icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
    width: min(960px, 92vw);
  }

  .icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #fff;
    border: 1px solid rgb(30, 27, 75, 0.08);
    border-radius: 0.5rem;
    min-height: 96px;
  }

  .icon-card span {
    font-size: 0.75rem;
    color: #4338ca;
    text-align: center;
    line-height: 1.2;
  }
</style>
