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
  @use 'tokens' as t;

  .static-page {
    min-height: 100%;
  }

  .page-header {
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$bg, muted)});
    border-bottom: 1px solid map.get(t.$border, default);
    padding: 2.5rem 1rem;
  }

  .page-header-inner {
    max-width: t.$container-max;
    margin: 0 auto;
  }

  .page-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: map.get(t.$font-weight, bold);
    color: map.get(t.$text, primary);
    margin: 0 0 0.5rem;
  }

  .page-desc {
    font-size: map.get(t.$font-size, sm);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .page-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .static-article {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .article-section {
    background: map.get(t.$bg, surface);
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    padding: 1.5rem 2rem;

    h2 {
      font-size: map.get(t.$font-size, lg);
      font-weight: map.get(t.$font-weight, semibold);
      color: map.get(t.$text, primary);
      margin: 0 0 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid map.get(t.$border, default);
    }

    p {
      font-size: map.get(t.$font-size, base);
      color: map.get(t.$text, secondary);
      line-height: map.get(t.$line-height, relaxed);
      margin: 0 0 0.75rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      margin: 0;
      padding-left: 1.5rem;

      li {
        font-size: map.get(t.$font-size, base);
        color: map.get(t.$text, secondary);
        line-height: map.get(t.$line-height, relaxed);
        margin-bottom: 0.25rem;
      }
    }
  }
</style>
