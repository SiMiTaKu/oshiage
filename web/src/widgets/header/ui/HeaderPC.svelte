<script lang="ts">
  import { page } from '$app/stores'
  import { IconsGallery, Button } from '@oshiage/design-system'
  import { HEADER_NAVIGATION } from '@widgets/header/config/headerConfig'
  import { ROUTES } from '@shared/routes'

  const NAVIGATION = HEADER_NAVIGATION

  const isActive = (href: string) => $page.url.pathname.startsWith(href)
</script>

<header class="site-header">
  <div class="header-inner">
    <a href={ROUTES.home} class="header-logo" aria-label="推しアゲ トップページ"> 推しアゲ </a>

    <nav class="header-nav" aria-label="メインナビゲーション">
      {#each NAVIGATION as item, index (index)}
        <a
          href={item.href}
          class="header-nav-link"
          class:active-header-nav-link={isActive(item.href)}
          aria-current={isActive(item.href) ? 'page' : undefined}
        >
          {item.name}
        </a>
      {/each}
    </nav>

    <!-- アクション -->
    <div class="header-actions">
      <a href="/search" aria-label="検索">
        <IconsGallery name="search" size={20} color="gray" />
      </a>
      <Button
        label="ログイン"
        variant="primary-outline"
        type="link-button"
        href={ROUTES.auth.signIn}
      />
      <Button label="新規登録"
variant="primary"
type="link-button"
href={ROUTES.auth.signUp} />
    </div>
  </div>
</header>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .site-header {
    position: sticky;
    display: grid;
    place-items: center;
    width: 100%;
    padding: 0 16px;
    top: 0;
    z-index: #{map.get($z, sticky)};
    background: rgb(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid map.get($border, default);
  }

  .header-inner {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr auto 1fr;
    width: 100%;
    max-width: $container-max;
    height: 64px;
    align-items: center;
  }

  .header-logo {
    display: grid;
    gap: 8px;
    font-size: map.get($font-size, xl);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    background: linear-gradient(135deg, #{map.get($brand, 500)}, #{map.get($indigo, 500)});
    transition: transform map.get($transition, fast);
    place-items: center start;
    text-decoration: none;
    flex-shrink: 0;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    &:hover {
      transform: translateY(-1px);
    }
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .header-nav-link {
    position: relative;
    padding-bottom: 2px;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, muted);
    transition: color map.get($transition, fast);
    text-decoration: none;

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
  }

  .active-header-nav-link {
    color: map.get($brand, 500);

    &::after {
      width: 100%;
    }
  }

  .header-actions {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr auto auto;
    place-items: center end;
    flex-shrink: 0;
  }
</style>
