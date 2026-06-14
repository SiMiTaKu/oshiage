<script lang="ts">
  import { page } from '$app/stores'
  import {
    ERROR_PAGE_TITLE,
    ERROR_PAGE_DEFAULT_TITLE,
    ERROR_PAGE_MESSAGE,
    ERROR_PAGE_DEFAULT_MESSAGE,
  } from '@pages/error/config/errorPageConfig'
  import { ROUTES } from '@shared/routes'

  const title = $derived(ERROR_PAGE_TITLE[$page.status] ?? ERROR_PAGE_DEFAULT_TITLE)
  const message = $derived(
    ERROR_PAGE_MESSAGE[$page.status] ?? $page.error?.message ?? ERROR_PAGE_DEFAULT_MESSAGE,
  )
</script>

<svelte:head>
  <title>{title} | 推しアゲ</title>
</svelte:head>

<div class="error-page">
  <div class="error-content">
    <p class="error-code">{$page.status}</p>
    <h1 class="error-title">{title}</h1>
    <p class="error-message">{message}</p>
    <div class="error-actions">
      <a href={ROUTES.home} class="btn-primary">トップページへ戻る</a>
      <a href={ROUTES.events.index} class="btn-outline">イベントを探す</a>
    </div>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100dvh - 200px);
    padding: 64px 16px;
  }

  .error-content {
    display: flex;
    gap: 20px;
    max-width: 480px;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  .error-code {
    font-size: clamp(64px, 15vw, 128px);
    font-weight: map.get($font-weight, bold);
    background: linear-gradient(135deg, #{map.get($brand, 400)}, #{map.get($indigo, 500)});
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .error-title {
    font-size: clamp(20px, 3vw, 28px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .error-message {
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
  }

  .error-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    padding: 12px 24px;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, semibold);
    color: white;
    border-radius: map.get($radius, lg);
    background: map.get($brand, 500);
    transition: background map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      background: map.get($brand, 600);
    }
  }

  .btn-outline {
    display: inline-flex;
    padding: 12px 24px;
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, lg);
    transition:
      background map.get($transition, fast),
      border-color map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      background: map.get($bg, muted);
    }
  }
</style>
