<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import type { IconName } from '@oshiage/design-system'
  import { HOME_FEATURES } from '../../config/homePageConfig'

  const FEATURE_ICONS: IconName[] = ['calendar', 'users', 'shield', 'trendingUp']
</script>

<section class="features-section">
  <div class="section-inner">
    <div class="section-header">
      <h2 class="section-title">推しアゲでできること</h2>
      <p class="section-desc">
        情報が届かないことで消えていく才能をゼロに。<br />
        ファンの熱量を直接的な「競技継続の糧」へと変換します。
      </p>
    </div>

    <div class="features-grid">
      {#each HOME_FEATURES as feature, index (index)}
        {@const iconName = FEATURE_ICONS[index]}
        <div class="feature-card">
          <div class="feature-icon">
            <IconsGallery name={iconName} size={24} color="primary" />
          </div>
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-desc">{feature.description}</p>
        </div>
      {/each}
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

  .section-header {
    text-align: center;
  }

  .section-title {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .section-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
  }

  .features-section {
    padding: 80px 0;
    background: map.get($bg, surface);
  }

  .features-grid {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get($breakpoint, lg)}) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .feature-card {
    padding: 24px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, base);
    transition:
      border-color map.get($transition, base),
      box-shadow map.get($transition, base),
      transform map.get($transition, base);

    &:hover {
      border-color: rgb(255, 107, 53, 0.3);
      box-shadow: map.get($shadow, lg);
      transform: translateY(-4px);
    }
  }

  .feature-icon {
    display: flex;
    width: 48px;
    height: 48px;
    color: map.get($brand, 500);
    border-radius: map.get($radius, lg);
    background: rgb(255, 107, 53, 0.1);
    transition: background map.get($transition, fast);
    align-items: center;
    justify-content: center;

    .feature-card:hover & {
      background: rgb(255, 107, 53, 0.2);
    }
  }

  .feature-title {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
  }

  .feature-desc {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
  }
</style>
