<script lang="ts">
  import { Button } from '@oshiage/design-system'
</script>

<main class="admin-shell">
  <header>
    <p class="eyebrow">admin</p>
    <h1>運営向け MVP ダッシュボードの骨格</h1>
  </header>

  <section class="cards">
    <article class="card">
      <strong>削除依頼</strong>
      <p>Phase 5 で一覧・モーダル・審査アクションを実装します。</p>
    </article>
    <article class="card">
      <strong>アカウント報告</strong>
      <p>Runbook のステータス遷移を前提に UI を拡張します。</p>
    </article>
  </section>

  <Button label="審査画面は後続 Phase で有効化" variant="secondary" />
</main>

<style>
  .admin-shell {
    display: grid;
    gap: 24px;
    padding: 48px;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #4e6d4a;
  }

  .cards {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .card {
    padding: 24px;
    border: 1px solid rgb(31, 43, 30, 0.08);
    border-radius: 24px;
    background: rgb(255, 255, 255, 0.72);
  }
</style>
