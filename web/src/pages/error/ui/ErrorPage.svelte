<script lang="ts">
  import { page } from '$app/stores'
  import {
    ERROR_PAGE_TITLE,
    ERROR_PAGE_DEFAULT_TITLE,
    ERROR_PAGE_MESSAGE,
    ERROR_PAGE_DEFAULT_MESSAGE,
  } from '../config/error-page.config'

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
      <a href="/" class="btn-primary">トップページへ戻る</a>
      <a href="/events" class="btn-outline">イベントを探す</a>
    </div>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as t;

  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100dvh - 200px);
    padding: 4rem 1rem;
  }

  .error-content {
    max-width: 480px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .error-code {
    font-size: clamp(4rem, 15vw, 8rem);
    font-weight: map.get(t.$font-weight, bold);
    background: linear-gradient(135deg, #{map.get(t.$brand, 400)}, #{map.get(t.$indigo, 500)});
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin: 0;
  }

  .error-title {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0;
  }

  .error-message {
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, muted);
    line-height: map.get(t.$line-height, relaxed);
    margin: 0;
  }

  .error-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: map.get(t.$brand, 500);
    color: white;
    border-radius: map.get(t.$radius, lg);
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, semibold);
    text-decoration: none;
    transition: background map.get(t.$transition, fast);

    &:hover {
      background: map.get(t.$brand, 600);
    }
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border: 1px solid map.get(t.$border, default);
    color: map.get(t.$text, primary);
    border-radius: map.get(t.$radius, lg);
    font-size: map.get(t.$font-size, sm);
    font-weight: map.get(t.$font-weight, semibold);
    text-decoration: none;
    transition:
      background map.get(t.$transition, fast),
      border-color map.get(t.$transition, fast);

    &:hover {
      background: map.get(t.$bg, muted);
    }
  }
</style>
