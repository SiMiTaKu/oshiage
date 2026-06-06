<script lang="ts">
  import { page } from '$app/stores'
  import { Sheet, MenuIcon, SearchIcon, Button } from '@oshiage/design-system'
  import { HEADER_NAVIGATION } from '../config/headerConfig'
  import { ROUTES } from '../../../shared/routes'

  const NAVIGATION = HEADER_NAVIGATION

  let mobileOpen = $state(false)

  const closeMobile = () => {
    mobileOpen = false
  }

  const isActive = (href: string) => $page.url.pathname.startsWith(href)
</script>

<header class="site-header">
  <div class="header-inner">
    <a href={ROUTES.home} class="header-logo" aria-label="推しアゲ トップページ"> 推しアゲ </a>

    {#if !$page.data.isMobile}
      <nav class="header-nav" aria-label="メインナビゲーション">
        {#each NAVIGATION as item, index (index)}
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
    {/if}

    <!-- アクション -->
    <div class="header-actions">
      {#if !$page.data.isMobile}
        <a href="/search" class="header-icon-btn" aria-label="検索">
          <SearchIcon size={20} color="gray" />
        </a>
        <Button
          label="ログイン"
          variant="primary-outline"
          type="link-button"
          href={ROUTES.auth.signIn}
        />
        <Button label="新規登録" variant="primary" type="link-button" href={ROUTES.auth.signUp} />
      {/if}

      {#if $page.data.isMobile}
        <!-- モバイルメニューボタン -->
        <button
          class="header-icon-btn"
          type="button"
          aria-label="メニューを開く"
          aria-expanded={mobileOpen}
          onclick={() => (mobileOpen = true)}
        >
          <MenuIcon size={20} color="gray" />
        </button>
      {/if}
    </div>
  </div>
</header>

<!-- モバイルドロワー -->
{#if mobileOpen}
  <Sheet side="right" onClose={closeMobile}>
    <nav class="mobile-nav" aria-label="モバイルナビゲーション">
      {#each NAVIGATION as item, index (index)}
        <a href={item.href} class="mobile-nav-link" onclick={closeMobile}>
          {item.name}
        </a>
      {/each}
    </nav>
    <div class="mobile-nav-actions">
      <Button
        label="ログイン"
        variant="primary-outline"
        type="link-button"
        href={ROUTES.auth.signIn}
        onclick={closeMobile}
      />
      <Button
        label="新規登録"
        variant="primary"
        type="link-button"
        href={ROUTES.auth.signUp}
        onclick={closeMobile}
      />
    </div>
  </Sheet>
{/if}

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .site-header {
    position: sticky;
    top: 0;
    z-index: #{map.get($z, sticky)};
    background: rgb(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid map.get($border, default);
  }

  .header-inner {
    max-width: $container-max;
    margin: 0 auto;
    padding: 0 1rem;
    height: 64px;
    display: grid;
    place-items: space-between center;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
  }

  .header-logo {
    display: grid;
    place-items: center start;
    gap: 0.5rem;
    text-decoration: none;
    flex-shrink: 0;
    transition: transform map.get($transition, fast);
    font-size: map.get($font-size, xl);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    background: linear-gradient(135deg, #{map.get($brand, 500)}, #{map.get($indigo, 500)});
    background-clip: text;
    -webkit-text-fill-color: transparent;

    &:hover {
      transform: translateY(-1px);
    }
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .header-nav-link {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
    text-decoration: none;
    position: relative;
    padding-bottom: 2px;
    transition: color map.get($transition, fast);

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: map.get($brand, 500);
      transition: width map.get($transition, base);
    }

    &:hover {
      color: map.get($text, primary);

      &::after {
        width: 100%;
      }
    }

    &--active {
      color: map.get($brand, 500);

      &::after {
        width: 100%;
      }
    }
  }

  .header-actions {
    display: grid;
    place-items: center end;
    grid-template-columns: 1fr auto auto;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
  }

  .mobile-nav-link {
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
    text-decoration: none;
    padding: 0.75rem 0;
    border-bottom: 1px solid map.get($border, default);
    transition: color map.get($transition, fast);

    &:hover {
      color: map.get($brand, 500);
    }
  }

  .mobile-nav-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1.5rem;
  }
</style>
