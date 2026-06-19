<script lang="ts">
  import { IconsGallery } from '@oshiage/design-system'
  import {
    HERO_IMAGES,
    HOME_STATS,
    HOME_EVENTS_HREF,
    HOME_ENTITIES_HREF,
  } from '../../config/homePageConfig'

  let currentHeroIndex = $state(0)

  $effect(() => {
    const interval = setInterval(() => {
      currentHeroIndex = (currentHeroIndex + 1) % HERO_IMAGES.length
    }, 10000)
    return () => clearInterval(interval)
  })
</script>

<section class="hero">
  {#each HERO_IMAGES as src, index (index)}
    <div
      class="hero-bg"
      class:hero-bg--visible={index === currentHeroIndex}
      style="background-image: url('{src}')"
    ></div>
  {/each}
  <div class="hero-overlay" aria-hidden="true"></div>

  <div class="hero-deco" aria-hidden="true">
    <div class="hero-deco-orb hero-deco-orb--orange"></div>
    <div class="hero-deco-orb hero-deco-orb--indigo"></div>
  </div>

  <div class="hero-content">
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

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

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
</style>
