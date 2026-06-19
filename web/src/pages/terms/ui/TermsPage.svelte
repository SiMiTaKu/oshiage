<script lang="ts">
  import { META_DATA } from '@shared/config/meta'
  const meta = META_DATA.terms
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="static-page">
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">利用規約</h1>
      <p class="page-desc">最終更新日: 2026年1月1日</p>
    </div>
  </div>

  <div class="page-body">
    <article class="static-article">
      <section class="article-section">
        <h2>第1条（適用）</h2>
        <p>
          本規約は、当社が提供するサービス「推しアゲ」（以下「本サービス」）の利用に関する条件を、本サービスを利用するすべてのユーザーと当社との間で定めるものです。
        </p>
      </section>

      <section class="article-section">
        <h2>第2条（利用登録）</h2>
        <p>
          利用登録の申請者が以下の事由に該当する場合、当社は利用登録の申請を承認しないことがあります。
        </p>
        <ul>
          <li>虚偽の事項を届け出た場合</li>
          <li>本規約に違反したことがある者からの申請である場合</li>
          <li>その他、当社が利用登録を相当でないと判断した場合</li>
        </ul>
      </section>

      <section class="article-section">
        <h2>第3条（禁止事項）</h2>
        <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当社または第三者の知的財産権、肖像権、プライバシーを侵害する行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </section>

      <section class="article-section">
        <h2>第4条（免責事項）</h2>
        <p>
          当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じたトラブルに関して一切責任を負いません。
        </p>
      </section>

      <section class="article-section">
        <h2>第5条（規約の変更）</h2>
        <p>
          当社は必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができます。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
        </p>
      </section>
    </article>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .static-page {
    min-height: 100%;
  }

  .page-header {
    padding: 40px 16px;
    background: linear-gradient(135deg, #{map.get($bg, surface)}, #{map.get($bg, muted)});
    border-bottom: 1px solid map.get($border, default);
  }

  .page-header-inner {
    max-width: $container-max;
    place-self: center;
  }

  .page-title {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
  }

  .page-desc {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .page-body {
    max-width: 800px;
    place-self: center;
    padding: 32px 16px;
  }

  .static-article {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .article-section {
    padding: 24px 32px;
    border: 1px solid map.get($border, default);
    border-radius: map.get($radius, xl);
    background: map.get($bg, surface);

    h2 {
      padding-bottom: 12px;
      font-size: map.get($font-size, lg);
      font-weight: map.get($font-weight, semibold);
      color: map.get($text, primary);
      border-bottom: 1px solid map.get($border, default);
    }

    p {
      font-size: map.get($font-size, base);
      color: map.get($text, secondary);
      line-height: map.get($line-height, relaxed);
    }

    ul {
      padding-left: 24px;

      li {
        font-size: map.get($font-size, base);
        color: map.get($text, secondary);
        line-height: map.get($line-height, relaxed);
      }
    }
  }
</style>
