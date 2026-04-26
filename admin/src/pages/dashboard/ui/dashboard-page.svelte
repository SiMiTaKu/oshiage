<script lang="ts">
  import { Button } from '@oshiage/design-system';
</script>

<main class="admin-shell">
  <header>
    <p class="eyebrow">admin</p>
    <h1>運営向け MVP ダッシュボードの骨格</h1>
  </header>

  <section class="cards">
    <article>
      <strong>削除依頼</strong>
      <p>Phase 5 で一覧・モーダル・審査アクションを実装します。</p>
    </article>
    <article>
      <strong>アカウント報告</strong>
      <p>Runbook のステータス遷移を前提に UI を拡張します。</p>
    </article>
  </section>

  <Button label="審査画面は後続 Phase で有効化" tone="secondary" />
</main>

<style>
  .admin-shell {
    display: grid;
    gap: 1.5rem;
    padding: 3rem;
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #4e6d4a;
  }

  .cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  article {
    padding: 1.5rem;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(31, 43, 30, 0.08);
  }
</style>
