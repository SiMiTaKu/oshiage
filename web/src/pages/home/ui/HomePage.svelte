<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import {
    HERO_IMAGES,
    HOME_FEATURES,
    HOME_STATS,
    HOME_EVENTS_HREF,
    HOME_ENTITIES_HREF,
    HOME_SIGN_UP_HREF,
  } from '@pages/home/config/homePageConfig'

  import type { IconName } from '@oshiage/design-system'
  const FEATURE_ICONS: IconName[] = ['calendar', 'users', 'shield', 'trendingUp']

  let currentHeroIndex = $state(0)

  $effect(() => {
    const interval = setInterval(() => {
      currentHeroIndex = (currentHeroIndex + 1) % HERO_IMAGES.length
    }, 10000)
    return () => clearInterval(interval)
  })
</script>

<svelte:head>
  <title>推しアゲ | マイナースポーツ情報プラットフォーム</title>
  <meta
    name="description"
    content="散らばった競技情報を、ひとつに。あなたの応援を、選手に届く力へ。推しアゲは、情報難民ファンのための競技情報インフラです。"
  />
  <meta property="og:title" content="推しアゲ | マイナースポーツ情報プラットフォーム" />
  <meta
    property="og:description"
    content="散らばった競技情報を、ひとつに。あなたの応援を、選手に届く力へ。"
  />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- ===== ヒーローセクション ===== -->
<section class="hero">
  <!-- 背景画像（10秒ローテーション） -->
  {#each HERO_IMAGES as src, index (index)}
    <div
      class="hero-bg"
      class:hero-bg--visible={index === currentHeroIndex}
      style="background-image: url('{src}')"
    ></div>
  {/each}
  <div class="hero-overlay" aria-hidden="true"></div>

  <!-- 背景装飾 -->
  <div class="hero-deco" aria-hidden="true">
    <div class="hero-deco-orb hero-deco-orb--orange"></div>
    <div class="hero-deco-orb hero-deco-orb--indigo"></div>
  </div>

  <div class="hero-content">
    <!-- バッジ -->
    <div class="hero-badge">
      <span class="hero-badge-dot" aria-hidden="true"></span>
      男子新体操の情報を集約中
    </div>

    <h1 class="hero-heading">
      散らばった競技情報を、<br class="hero-heading-br" />
      <span class="hero-heading-accent">ひとつに。</span>
    </h1>

    <p class="hero-subtext">
      あなたの応援を、選手に届く力へ。<br />
      推しアゲは、情報難民ファンのための競技情報インフラです。
    </p>

    <!-- CTAボタン -->
    <div class="hero-cta">
      <a href={HOME_EVENTS_HREF} class="hero-btn hero-btn--primary">
        <IconsGallery name="search" size={20} color="white" />
        イベントを探す
      </a>
      <a href={HOME_ENTITIES_HREF} class="hero-btn hero-btn--outline">
        <IconsGallery name="users" size={20} color="white" />
        選手・チームを見る
      </a>
    </div>

    <p class="hero-note">登録不要でイベント・選手情報を閲覧できます</p>

    <!-- 統計カード -->
    <div class="hero-stats">
      {#each HOME_STATS as stat, index (index)}
        <div class="hero-stat-card">
          <span class="hero-stat-value">{stat.value}</span>
          <span class="hero-stat-label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ===== FeaturesSection ===== -->
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

<!-- ===== イベントプレビュー ===== -->
<section class="preview-section">
  <div class="section-inner">
    <div class="preview-header">
      <div>
        <h2 class="section-title section-title--left">注目のイベント</h2>
        <p class="section-desc">これから開催される大会・発表会をチェック</p>
      </div>
      <a href={HOME_EVENTS_HREF} class="preview-link">
        すべて見る
        <IconsGallery name="chevronRight" size={16} color="secondary" />
      </a>
    </div>
    <div class="preview-empty-box">
      <IconsGallery name="calendar" size={32} color="secondary" />
      <p>イベント情報は<a href={HOME_EVENTS_HREF}>イベント一覧</a>で確認できます</p>
    </div>
  </div>
</section>

<!-- ===== 選手・チームプレビュー ===== -->
<section class="preview-section preview-section--alt">
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

<!-- ===== CTA Section ===== -->
<section class="cta-section">
  <div class="cta-inner">
    <h2 class="cta-title">今すぐ始めよう</h2>
    <p class="cta-desc">
      アカウント登録で、イベント情報の投稿や選手申請に参加できます。<br />
      閲覧だけなら登録不要です。
    </p>
    <div class="cta-actions">
      <a href={HOME_SIGN_UP_HREF} class="cta-btn cta-btn--primary">無料で登録する</a>
      <a href={HOME_EVENTS_HREF} class="cta-btn cta-btn--secondary">閲覧のみで使う</a>
    </div>
  </div>
</section>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  /* ── Hero ── */
  .hero {
    position: relative;
    display: flex;
    min-height: 600px;
    padding: 80px 16px 64px;
    overflow: hidden;
    align-items: center;

    @media (min-width: #{map.get($breakpoint, md)}) {
      padding: 112px 16px 96px;
    }
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease;
  }

  .hero-bg--visible {
    opacity: 1;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgb(17, 24, 39, 0.82) 0%,
      rgb(31, 41, 55, 0.72) 50%,
      rgb(79, 70, 229, 0.52) 100%
    );
  }

  .hero-deco {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .hero-deco-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .hero-deco-orb--orange {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: rgb(255, 107, 53, 0.2);
    filter: blur(80px);
    top: -25%;
    right: -10%;
  }

  .hero-deco-orb--indigo {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgb(79, 70, 229, 0.2);
    filter: blur(80px);
    bottom: -15%;
    left: -10%;
  }

  .hero-content {
    position: relative;
    width: 100%;
    max-width: 800px;
    place-self: center;
    text-align: center;
  }

  .hero-badge {
    display: inline-flex;
    gap: 8px;
    padding: 6px 16px;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: #fff;
    border: 1px solid rgb(255, 255, 255, 0.2);
    border-radius: map.get($radius, full);
    background: rgb(255, 255, 255, 0.15);
    align-items: center;
    backdrop-filter: blur(4px);
  }

  .hero-badge-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;

    &::before {
      position: absolute;
      border-radius: 50%;
      background: #fff;
      animation: ping 1.5s ease-in-out infinite;
      content: '';
      inset: 0;
    }
  }

  @keyframes ping {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.75;
    }

    50% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .hero-heading {
    font-size: clamp(30px, 5vw, 60px);
    font-weight: map.get($font-weight, bold);
    color: #fff;
    line-height: map.get($line-height, tight);
    text-shadow: 0 2px 8px rgb(0, 0, 0, 0.3);
  }

  .hero-heading-br {
    display: none;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      display: block;
    }
  }

  .hero-heading-accent {
    color: #ffb394;
  }

  .hero-subtext {
    font-size: map.get($font-size, lg);
    color: rgb(255, 255, 255, 0.9);
    line-height: map.get($line-height, relaxed);

    @media (min-width: #{map.get($breakpoint, md)}) {
      font-size: map.get($font-size, xl);
    }
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
    }
  }

  .hero-btn {
    display: inline-flex;
    gap: 8px;
    padding: 12px 32px;
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    border-radius: map.get($radius, lg);
    transition:
      transform map.get($transition, fast),
      box-shadow map.get($transition, fast),
      background map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .hero-btn--primary {
    display: inline-flex;
    gap: 8px;
    padding: 12px 32px;
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: #fff;
    border-radius: map.get($radius, lg);
    background: map.get($brand, 500);
    transition:
      transform map.get($transition, fast),
      box-shadow map.get($transition, fast),
      background map.get($transition, fast);
    align-items: center;
    text-decoration: none;
    box-shadow: 0 4px 16px rgb(255, 107, 53, 0.3);

    &:hover {
      transform: translateY(-2px);
      background: map.get($brand, 600);
      box-shadow: 0 8px 24px rgb(255, 107, 53, 0.4);
    }
  }

  .hero-btn--outline {
    display: inline-flex;
    gap: 8px;
    padding: 12px 32px;
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: #fff;
    border: 1.5px solid rgb(255, 255, 255, 0.4);
    border-radius: map.get($radius, lg);
    background: rgb(255, 255, 255, 0.1);
    transition:
      transform map.get($transition, fast),
      box-shadow map.get($transition, fast),
      background map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
      background: rgb(255, 255, 255, 0.2);
    }
  }

  .hero-note {
    font-size: map.get($font-size, sm);
    color: rgb(255, 255, 255, 0.7);
  }

  .hero-stats {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .hero-stat-card {
    width: 140px;
    padding: 20px 16px;
    border: 1px solid rgb(255, 255, 255, 0.7);
    border-radius: map.get($radius, xl);
    background: rgb(255, 255, 255, 0.85);
    transition: box-shadow map.get($transition, fast);
    backdrop-filter: blur(4px);
    text-align: center;
    box-sizing: border-box;

    &:hover {
      box-shadow: map.get($shadow, md);
    }
  }

  .hero-stat-value {
    display: block;
    font-size: map.get($font-size, 2xl);
    font-weight: map.get($font-weight, bold);
    color: map.get($brand, 500);
  }

  .hero-stat-label {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  /* ── Shared section ── */
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

  /* ── Features ── */
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

  /* ── Preview sections ── */
  .preview-section {
    padding: 80px 0;
    background: map.get($bg, base);
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

  /* ── CTA Section ── */
  .cta-section {
    padding: 80px 16px;
    background: linear-gradient(135deg, #{map.get($indigo, 600)} 0%, #{map.get($brand, 500)} 100%);
    text-align: center;
  }

  .cta-inner {
    max-width: 640px;
    place-self: center;
  }

  .cta-title {
    font-size: clamp(28px, 4vw, 36px);
    font-weight: map.get($font-weight, bold);
    color: #fff;
  }

  .cta-desc {
    font-size: map.get($font-size, base);
    color: rgb(255, 255, 255, 0.85);
    line-height: map.get($line-height, relaxed);
  }

  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: center;
    }
  }

  .cta-btn {
    display: inline-flex;
    padding: 12px 32px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    border-radius: map.get($radius, lg);
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .cta-btn--primary {
    display: inline-flex;
    padding: 12px 32px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    color: map.get($brand, 500);
    border-radius: map.get($radius, lg);
    background: #fff;
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
      background: rgb(255, 255, 255, 0.9);
    }
  }

  .cta-btn--secondary {
    display: inline-flex;
    padding: 12px 32px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    color: #fff;
    border: 1.5px solid rgb(255, 255, 255, 0.5);
    border-radius: map.get($radius, lg);
    background: rgb(255, 255, 255, 0.1);
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
      background: rgb(255, 255, 255, 0.2);
    }
  }

  .hero {
    display: grid;
    place-items: center;
    min-height: 100vh;
    padding: 32px;
  }

  .copy {
    width: min(720px, 100%);
    padding: 48px;
    border: 1px solid rgb(19, 34, 56, 0.08);
    border-radius: 32px;
    background: rgb(255, 255, 255, 0.75);
    backdrop-filter: blur(18px);
    box-shadow: 0 24px 60px rgb(19, 34, 56, 0.12);
  }

  .eyebrow {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4d739d;
  }

  .title {
    font-size: clamp(32px, 6vw, 64px);
    line-height: 1.1;
  }

  .description {
    font-size: 16px;
    line-height: 1.7;
  }
</style>
