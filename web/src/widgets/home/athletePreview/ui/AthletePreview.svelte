<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import { HOME_ENTITIES_HREF } from '../../config/homePageConfig'
</script>

<section class="preview-section--alt">
  <div class="section-inner">
    <div class="preview-header">
      <div>
        <h2 class="section-title section-title--left">選手・チーム</h2>
        <p class="section-desc">男子新体操で活躍する選手・チームの情報</p>
      </div>
      <a href={HOME_ENTITIES_HREF} class="preview-link">
        すべて見る
        <IconsGallery name="chevronRight" size={16} color="secondary" />
      </a>
    </div>
    <div class="preview-empty-box">
      <IconsGallery name="users" size={32} color="secondary" />
      <p>選手・チーム情報は<a href={HOME_ENTITIES_HREF}>一覧ページ</a>で確認できます</p>
    </div>
  </div>
</section>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .section-inner {
    max-width: $container-max;
    place-self: center;
    padding: 0 16px;
  }

  .section-title {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .section-title--left {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    text-align: left;
  }

  .section-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
  }

  .preview-section--alt {
    padding: 80px 0;
    background: map.get($bg, surface);
  }

  .preview-header {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  .preview-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
    text-decoration: none;
    transition: color map.get($transition, fast);
    flex-shrink: 0;

    &:hover {
      color: map.get($brand, 500);
    }
  }

  .preview-empty-box {
    display: flex;
    gap: 12px;
    padding: 48px;
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    border: 1px dashed map.get($border, default);
    border-radius: map.get($radius, xl);
    flex-direction: column;
    align-items: center;
    text-align: center;

    a {
      font-weight: map.get($font-weight, medium);
      color: map.get($brand, 500);
    }
  }
</style>
