<script lang="ts">
  import { Button } from '@oshiage/design-system'
</script>

<section class="hero">
  <div class="copy">
    <p class="eyebrow">Phase 1 Scaffold</p>
    <h1 class="title">推しアゲ web の FSD 土台を初期化しました。</h1>
    <p class="description">
      SvelteKit、TypeScript、OpenAPI クライアント連携、design-system 依存を含む最小構成です。
    </p>
    <Button label="イベント一覧は Phase 2 で実装" />
  </div>
</section>

<style>
  .hero {
    display: grid;
    place-items: center;
    min-height: 100vh;
    padding: 2rem;
  }

  .copy {
    width: min(720px, 100%);
    padding: 3rem;
    border: 1px solid rgba(19, 34, 56, 0.08);
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(18px);
    box-shadow: 0 24px 60px rgba(19, 34, 56, 0.12);
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
