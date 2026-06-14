<svelte:head>
  <title>プライバシーポリシー | 推しアゲ</title>
  <meta
    name="description"
    content="推しアゲのプライバシーポリシーです。個人情報の取り扱いについてご確認ください。"
  />
</svelte:head>

<div class="static-page">
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">プライバシーポリシー</h1>
      <p class="page-desc">最終更新日: 2026年1月1日</p>
    </div>
  </div>

  <div class="page-body">
    <article class="static-article">
      <section class="article-section">
        <h2>1. 個人情報の収集について</h2>
        <p>当社は、サービス提供のため以下の個人情報を収集することがあります。</p>
        <ul>
          <li>メールアドレス</li>
          <li>表示名</li>
          <li>サービス利用履歴</li>
        </ul>
      </section>

      <section class="article-section">
        <h2>2. 個人情報の利用目的</h2>
        <p>収集した個人情報は、以下の目的のために利用します。</p>
        <ul>
          <li>本サービスの提供・運営</li>
          <li>ユーザーへの連絡・通知</li>
          <li>サービスの改善・新機能開発</li>
        </ul>
      </section>

      <section class="article-section">
        <h2>3. 個人情報の第三者提供</h2>
        <p>当社は、以下の場合を除き、第三者に個人情報を提供しません。</p>
        <ul>
          <li>法令に基づく場合</li>
          <li>人命・財産保護のために必要な場合</li>
          <li>ユーザーの同意がある場合</li>
        </ul>
      </section>

      <section class="article-section">
        <h2>4. 個人情報の開示・訂正・削除</h2>
        <p>
          ユーザーは、当社が保有する個人情報の開示・訂正・削除を請求する権利を有します。ご要望の場合は、サポート窓口までお問い合わせください。
        </p>
      </section>

      <section class="article-section">
        <h2>5. Cookieの使用</h2>
        <p>
          本サービスでは、ユーザー体験向上のためCookieを使用しています。ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。
        </p>
      </section>

      <section class="article-section">
        <h2>6. お問い合わせ</h2>
        <p>個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
        <p>メール: privacy@oshiage.example.com</p>
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
