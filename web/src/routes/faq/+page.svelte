<script lang="ts">
  let openIds = $state<Set<string>>(new Set())

  function toggle(id: string) {
    if (openIds.has(id)) {
      openIds.delete(id)
    } else {
      openIds.add(id)
    }
    openIds = new Set(openIds)
  }

  const faqItems = [
    {
      id: 'q1',
      question: '推しアゲとはどんなサービスですか？',
      answer:
        '推しアゲは、男子新体操の選手・チームの情報やイベントを一元管理・閲覧できるプラットフォームです。選手のプロフィール、大会・発表会などのイベント情報を簡単に検索・閲覧できます。',
    },
    {
      id: 'q2',
      question: '無料で利用できますか？',
      answer:
        '情報の閲覧は無料でご利用いただけます。イベントや選手情報の投稿・編集には会員登録が必要です。',
    },
    {
      id: 'q3',
      question: '会員登録の方法を教えてください。',
      answer:
        'トップページまたは各ページの「新規登録」ボタンからご登録いただけます。メールアドレスとパスワードを設定するだけで簡単に登録できます。',
    },
    {
      id: 'q4',
      question: 'イベント情報を投稿するにはどうすれば良いですか？',
      answer:
        '会員登録・ログイン後、イベント一覧ページの「投稿する」ボタンから新規イベントを登録できます。大会・発表会・練習会・ワークショップなど、各種イベントに対応しています。',
    },
    {
      id: 'q5',
      question: '選手・チーム情報の変更履歴はどこで確認できますか？',
      answer:
        '選手・チームの詳細ページ内の「変更履歴」タブから、過去のプロフィール変更内容をすべて確認できます。',
    },
    {
      id: 'q6',
      question: '退会方法を教えてください。',
      answer:
        'アカウント設定ページの「退会する」ボタンから退会手続きが行えます。退会後はデータが削除されますので、ご注意ください。',
    },
    {
      id: 'q7',
      question: '問い合わせ先はどこですか？',
      answer:
        '下記のメールアドレスまでお問い合わせください。support@oshiage.example.com\n内容を確認後、3営業日以内にご回答いたします。',
    },
  ]
</script>

<svelte:head>
  <title>よくある質問 | 推しアゲ</title>
  <meta
    name="description"
    content="推しアゲのよくある質問（FAQ）ページです。サービスの使い方や会員登録など、よくあるご質問にお答えします。"
  />
</svelte:head>

<div class="faq-page">
  <div class="page-header">
    <div class="page-header-inner">
      <h1 class="page-title">よくある質問</h1>
      <p class="page-desc">ご不明な点があればお気軽にお問い合わせください。</p>
    </div>
  </div>

  <div class="page-body">
    <div class="faq-list">
      {#each faqItems as item (item.id)}
        {@const isOpen = openIds.has(item.id)}
        <div class="faq-item" class:faq-item--open={isOpen}>
          <button
            type="button"
            class="faq-trigger"
            aria-expanded={isOpen}
            onclick={() => toggle(item.id)}
          >
            <span class="faq-question">{item.question}</span>
            <svg
              class="faq-chevron"
              class:rotated={isOpen}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {#if isOpen}
            <div class="faq-answer">
              <p>{item.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .faq-page {
    min-height: 100%;
  }

  .page-header {
    background: linear-gradient(135deg, #{map.get(t.$bg, surface)}, #{map.get(t.$indigo, 50)});
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
    font-size: map.get(t.$font-size, base);
    color: map.get(t.$text, muted);
    margin: 0;
  }

  .page-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid map.get(t.$border, default);
    border-radius: map.get(t.$radius, xl);
    overflow: hidden;
  }

  .faq-item {
    border-bottom: 1px solid map.get(t.$border, default);

    &:last-child {
      border-bottom: none;
    }

    &--open {
      background: map.get(t.$bg, muted);
    }
  }

  .faq-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1.25rem 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background map.get(t.$transition, fast);

    &:hover {
      background: map.get(t.$bg, muted);
    }
  }

  .faq-question {
    font-size: map.get(t.$font-size, base);
    font-weight: map.get(t.$font-weight, medium);
    color: map.get(t.$text, primary);
    line-height: map.get(t.$line-height, snug);
  }

  .faq-chevron {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: map.get(t.$text, muted);
    transition: transform map.get(t.$transition, base);

    &.rotated {
      transform: rotate(180deg);
    }
  }

  .faq-answer {
    padding: 0 1.5rem 1.25rem;

    p {
      font-size: map.get(t.$font-size, base);
      color: map.get(t.$text, secondary);
      line-height: map.get(t.$line-height, relaxed);
      margin: 0;
      white-space: pre-wrap;
    }
  }
</style>
