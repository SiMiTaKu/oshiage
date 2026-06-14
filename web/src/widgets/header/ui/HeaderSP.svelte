<script lang="ts">
  import { Sheet, Button } from '@oshiage/design-system'
  import { HEADER_NAVIGATION } from '@widgets/header/config/headerConfig'
  import { ROUTES } from '@shared/routes'

  const NAVIGATION = HEADER_NAVIGATION

  let mobileOpen = $state(false)

  const closeMobile = () => {
    mobileOpen = false
  }
</script>

<header class="site-header">
  <div class="header-inner">
    <a href={ROUTES.home} class="header-logo" aria-label="推しアゲ トップページ"> 推しアゲ </a>

    <!-- アクション -->
    <div class="header-actions">
      <!-- モバイルメニューボタン -->
      <Button
        type="icon"
        icon="menu"
        aria-label="メニューを開く"
        variant="secondary-outline"
        onclick={() => (mobileOpen = true)}
        iconColor="gray"
      />
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
    display: grid;
    place-items: center;
    width: 100%;
    padding: 0 16px;
    top: 0;
    z-index: #{map.get($z, sticky)};
    background: rgb(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid map.get($border, default);
    box-sizing: border-box;
  }

  .header-inner {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr auto;
    width: 100%;
    max-width: $container-max;
    height: 64px;
    align-items: center;
    justify-content: space-between;
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

  .header-actions {
    display: grid;
    place-items: center end;
    gap: 8px;
    flex-shrink: 0;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding-top: 40px;
  }

  .mobile-nav-link {
    padding: 12px 0;
    font-size: map.get($font-size, lg);
    font-weight: map.get($font-weight, medium);
    color: map.get($text, primary);
    transition: color map.get($transition, fast);
    text-decoration: none;
    border-bottom: 1px solid map.get($border, default);

    &:hover {
      color: map.get($brand, 500);
    }
  }

  .mobile-nav-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 24px;
  }
</style>
