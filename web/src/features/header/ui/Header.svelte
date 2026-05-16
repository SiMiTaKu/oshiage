<script lang="ts">
  import { page } from '$app/stores'
  import { Sheet, MenuIcon, SearchIcon } from '@oshiage/design-system'

  const NAVIGATION = [
    { name: 'イベント', href: '/events' },
    { name: '選手・チーム', href: '/entities' },
    { name: 'お知らせ', href: '/notices' },
  ]

  let mobileOpen = $state(false)

  function closeMobile() {
    mobileOpen = false
  }

  function isActive(href: string) {
    return $page.url.pathname.startsWith(href)
  }
</script>

<header class="site-header">
  <div class="header-inner">
    <!-- ロゴ -->
    <a href="/" class="header-logo" aria-label="推しアゲ トップページ">
      <span class="header-logo-text">推しアゲ</span>
    </a>

    <!-- デスクトップナビ -->
    <nav class="header-nav" aria-label="メインナビゲーション">
      {#each NAVIGATION as item}
        <a
          href={item.href}
          class="header-nav-link"
          class:header-nav-link--active={isActive(item.href)}
          aria-current={isActive(item.href) ? 'page' : undefined}
        >
          {item.name}
        </a>
      {/each}
    </nav>

    <!-- アクション -->
    <div class="header-actions">
      <a href="/search" class="header-icon-btn header-icon-btn--desktop" aria-label="検索">
        <SearchIcon size={20} color="gray" />
      </a>
      <a href="/auth/sign-in" class="header-btn header-btn--ghost header-btn--desktop">ログイン</a>
      <a href="/auth/sign-up" class="header-btn header-btn--primary header-btn--desktop">新規登録</a
      >

      <!-- モバイルメニューボタン -->
      <button
        class="header-icon-btn header-icon-btn--mobile"
        type="button"
        aria-label="メニューを開く"
        aria-expanded={mobileOpen}
        onclick={() => (mobileOpen = true)}
      >
        <MenuIcon size={20} color="gray" />
      </button>
    </div>
  </div>
</header>

<!-- モバイルドロワー -->
{#if mobileOpen}
  <Sheet side="right" onClose={closeMobile}>
    <nav class="mobile-nav" aria-label="モバイルナビゲーション">
      {#each NAVIGATION as item}
        <a href={item.href} class="mobile-nav-link" onclick={closeMobile}>
          {item.name}
        </a>
      {/each}
    </nav>
    <div class="mobile-nav-actions">
      <a
        href="/auth/sign-in"
        class="header-btn header-btn--outline header-btn--full"
        onclick={closeMobile}
      >
        ログイン
      </a>
      <a
        href="/auth/sign-up"
        class="header-btn header-btn--primary header-btn--full"
        onclick={closeMobile}
      >
        新規登録
      </a>
    </div>
  </Sheet>
{/if}

<style lang="scss">
  @use 'sass:map';
  @use 'index' as t;

  .site-header {
    position: sticky;
    top: 0;
    z-index: #{map.get(t.$z, sticky)};
    background: rgb(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid map.get(t.$border, default);
  }

  .header-inner {
    max-width: t.$container-max;
    margin: 0 auto;
    padding: 0 1rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    flex-shrink: 0;
    transition: transform map.get(t.$transition, fast);

    &:hover {
      transform: translateY(-1px);
    }
  }

  .header-logo-text {
    font-size: map.get(t.$font-size, xl);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    background: linear-gradient(135deg, #{map.get(t.$brand, 500)}, #{map.get(t.$indigo, 500)});
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header-nav {
    display: none;
    align-items: center;
    gap: 2rem;

    @media (min-width: #{map.get(t.$breakpoint, md)}) {
      display: flex;
    }
  }

  .header-nav-link {
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, muted);
    text-decoration: none;
    position: relative;
    padding-bottom: 2px;
    transition: color map.get(t.$transition, fast);

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: map.get(t.$brand, 500);
      transition: width map.get(t.$transition, base);
    }

    &:hover {
      color: map.get(t.$text, primary);

      &::after {
        width: 100%;
      }
    }

    &--active {
      color: map.get(t.$brand, 500);

      &::after {
        width: 100%;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .header-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    cursor: pointer;
    color: map.get(t.$text, muted);
    border-radius: map.get(t.$radius, md);
    transition:
      color map.get(t.$transition, fast),
      background map.get(t.$transition, fast);
    text-decoration: none;

    &:hover {
      color: map.get(t.$text, primary);
      background: map.get(t.$bg, muted);
    }

    &--desktop {
      display: none;

      @media (min-width: #{map.get(t.$breakpoint, sm)}) {
        display: flex;
      }
    }

    &--mobile {
      display: flex;

      @media (min-width: #{map.get(t.$breakpoint, md)}) {
        display: none;
      }
    }
  }

  .header-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.875rem;
    border-radius: map.get(t.$radius, md);
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, medium);
    text-decoration: none;
    transition:
      background map.get(t.$transition, fast),
      color map.get(t.$transition, fast),
      border-color map.get(t.$transition, fast);
    border: 1px solid transparent;
    cursor: pointer;

    &--ghost {
      color: map.get(t.$text, muted);
      background: none;

      &:hover {
        color: map.get(t.$text, primary);
        background: map.get(t.$bg, muted);
      }
    }

    &--primary {
      background: map.get(t.$brand, 500);
      color: #fff;

      &:hover {
        background: map.get(t.$brand, 600);
      }
    }

    &--outline {
      border-color: map.get(t.$border, default);
      color: map.get(t.$text, primary);
      background: transparent;

      &:hover {
        background: map.get(t.$bg, muted);
      }
    }

    &--desktop {
      display: none;

      @media (min-width: #{map.get(t.$breakpoint, sm)}) {
        display: inline-flex;
      }
    }

    &--full {
      width: 100%;
      justify-content: center;
    }
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
  }

  .mobile-nav-link {
    font-size: map.get(t.$font-size, lg);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
    text-decoration: none;
    padding: 0.75rem 0;
    border-bottom: 1px solid map.get(t.$border, default);
    transition: color map.get(t.$transition, fast);

    &:hover {
      color: map.get(t.$brand, 500);
    }
  }

  .mobile-nav-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1.5rem;
  }
</style>
