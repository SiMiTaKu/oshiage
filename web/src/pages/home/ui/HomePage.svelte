<script lang="ts">
  import {
    CalendarIcon,
    UsersIcon,
    ShieldIcon,
    TrendingUpIcon,
    SearchIcon,
    ChevronRightIcon,
  } from '@oshiage/design-system'
  import {
    HERO_IMAGES,
    HOME_FEATURES,
    HOME_STATS,
    HOME_EVENTS_HREF,
    HOME_ENTITIES_HREF,
    HOME_SIGN_UP_HREF,
  } from '../config/homePageConfig'
  import { ROUTES } from '../../../shared/routes'

  const FEATURE_ICONS = [CalendarIcon, UsersIcon, ShieldIcon, TrendingUpIcon]

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
  {#each HERO_IMAGES as src, i}
    <div
      class="hero-bg"
      class:hero-bg--visible={i === currentHeroIndex}
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
        <SearchIcon size={20} color="white" />
        イベントを探す
      </a>
      <a href={HOME_ENTITIES_HREF} class="hero-btn hero-btn--outline">
        <UsersIcon size={20} color="white" />
        選手・チームを見る
      </a>
    </div>

    <p class="hero-note">登録不要でイベント・選手情報を閲覧できます</p>

    <!-- 統計カード -->
    <div class="hero-stats">
      {#each HOME_STATS as stat}
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
      {#each HOME_FEATURES as feature, i}
        <div class="feature-card">
          <div class="feature-icon">
            <svelte:component this={FEATURE_ICONS[i]} size={24} color="primary" />
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
        <ChevronRightIcon size={16} color="secondary" />
      </a>
    </div>
    <div class="preview-empty-box">
      <CalendarIcon size={32} color="secondary" />
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
        <ChevronRightIcon size={16} color="secondary" />
      </a>
    </div>
    <div class="preview-empty-box">
      <UsersIcon size={32} color="secondary" />
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
    overflow: hidden;
    padding: 5rem 1rem 4rem;
    min-height: 600px;
    display: flex;
    align-items: center;

    @media (min-width: #{map.get($breakpoint, md)}) {
      padding: 7rem 1rem 6rem;
    }
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease;

    &--visible {
      opacity: 1;
    }
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

    &--orange {
      top: -25%;
      right: -10%;
      width: 500px;
      height: 500px;
      background: rgb(255, 107, 53, 0.2);
    }

    &--indigo {
      bottom: -15%;
      left: -10%;
      width: 400px;
      height: 400px;
      background: rgb(79, 70, 229, 0.2);
    }
  }

  .hero-content {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 1rem;
    border-radius: map.get($radius, full);
    background: rgb(255, 255, 255, 0.15);
    border: 1px solid rgb(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    margin-bottom: 1.5rem;
  }

  .hero-badge-dot {
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #fff;
      border-radius: 50%;
      animation: ping 1.5s ease-in-out infinite;
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
    font-size: clamp(1.875rem, 5vw, 3.75rem);
    font-weight: map.get($font-weight, bold);
    color: #fff;
    line-height: map.get($line-height, tight);
    margin: 0 0 1.5rem;
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
    margin: 0 0 2rem;

    @media (min-width: #{map.get($breakpoint, md)}) {
      font-size: map.get($font-size, xl);
    }
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
    }
  }

  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    border-radius: map.get($radius, lg);
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    text-decoration: none;
    transition:
      transform map.get($transition, fast),
      box-shadow map.get($transition, fast),
      background map.get($transition, fast);

    &:hover {
      transform: translateY(-2px);
    }

    &--primary {
      background: map.get($brand, 500);
      color: #fff;
      box-shadow: 0 4px 16px rgb(255, 107, 53, 0.3);

      &:hover {
        background: map.get($brand, 600);
        box-shadow: 0 8px 24px rgb(255, 107, 53, 0.4);
      }
    }

    &--outline {
      border: 1.5px solid rgb(255, 255, 255, 0.4);
      color: #fff;
      background: rgb(255, 255, 255, 0.1);

      &:hover {
        background: rgb(255, 255, 255, 0.2);
      }
    }
  }

  .hero-note {
    margin: 1.5rem 0 0;
    font-size: map.get($font-size, sm);
    color: rgb(255, 255, 255, 0.7);
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 3rem;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .hero-stat-card {
    background: rgb(255, 255, 255, 0.85);
    backdrop-filter: blur(4px);
    border: 1px solid rgb(255, 255, 255, 0.7);
    border-radius: map.get($radius, xl);
    padding: 1.25rem 1rem;
    text-align: center;
    transition: box-shadow map.get($transition, fast);

    &:hover {
      box-shadow: map.get($shadow, md);
    }
  }

  .hero-stat-value {
    display: block;
    font-size: map.get($font-size, 2xl);
    font-weight: map.get($font-weight, bold);
    color: map.get($brand, 500);
    margin-bottom: 0.25rem;
  }

  .hero-stat-label {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  /* ── Shared section ── */
  .section-inner {
    max-width: $container-max;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    margin: 0 0 0.75rem;

    &--left {
      text-align: left;
    }
  }

  .section-desc {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    margin: 0;
  }

  /* ── Features ── */
  .features-section {
    background: map.get($bg, surface);
    padding: 5rem 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: #{map.get($breakpoint, lg)}) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .feature-card {
    padding: 1.5rem;
    border-radius: map.get($radius, xl);
    background: map.get($bg, base);
    border: 1px solid map.get($border, default);
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
    width: 48px;
    height: 48px;
    border-radius: map.get($radius, lg);
    background: rgb(255, 107, 53, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: map.get($brand, 500);
    transition: background map.get($transition, fast);

    .feature-card:hover & {
      background: rgb(255, 107, 53, 0.2);
    }
  }

  .feature-title {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    margin: 0 0 0.5rem;
  }

  .feature-desc {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    margin: 0;
  }

  /* ── Preview sections ── */
  .preview-section {
    padding: 5rem 0;
    background: map.get($bg, base);

    &--alt {
      background: map.get($bg, surface);
    }
  }

  .preview-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  .preview-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
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
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 3rem;
    color: map.get($text, muted);
    font-size: map.get($font-size, sm);
    text-align: center;
    border: 1px dashed map.get($border, default);
    border-radius: map.get($radius, xl);

    a {
      color: map.get($brand, 500);
      font-weight: map.get($font-weight, medium);
    }

    p {
      margin: 0;
    }
  }

  /* ── CTA Section ── */
  .cta-section {
    background: linear-gradient(135deg, #{map.get($indigo, 600)} 0%, #{map.get($brand, 500)} 100%);
    padding: 5rem 1rem;
    text-align: center;
  }

  .cta-inner {
    max-width: 640px;
    margin: 0 auto;
  }

  .cta-title {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: map.get($font-weight, bold);
    color: #fff;
    margin: 0 0 1rem;
  }

  .cta-desc {
    font-size: map.get($font-size, base);
    color: rgb(255, 255, 255, 0.85);
    line-height: map.get($line-height, relaxed);
    margin: 0 0 2rem;
  }

  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: center;
    }
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 2rem;
    border-radius: map.get($radius, lg);
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    text-decoration: none;
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);

    &:hover {
      transform: translateY(-2px);
    }

    &--primary {
      background: #fff;
      color: map.get($brand, 500);

      &:hover {
        background: rgb(255, 255, 255, 0.9);
      }
    }

    &--secondary {
      border: 1.5px solid rgb(255, 255, 255, 0.5);
      color: #fff;
      background: rgb(255, 255, 255, 0.1);

      &:hover {
        background: rgb(255, 255, 255, 0.2);
      }
    }
  }

  .hero {
    display: grid;
    place-items: center;
    min-height: 100vh;
    padding: 2rem;
  }

  .copy {
    width: min(720px, 100%);
    padding: 3rem;
    border: 1px solid rgb(19, 34, 56, 0.08);
    border-radius: 32px;
    background: rgb(255, 255, 255, 0.75);
    backdrop-filter: blur(18px);
    box-shadow: 0 24px 60px rgb(19, 34, 56, 0.12);
  }

  .eyebrow {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4d739d;
  }

  .title {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 1.1;
  }

  .description {
    margin: 0 0 1.5rem;
    font-size: 1rem;
    line-height: 1.7;
  }
</style>
