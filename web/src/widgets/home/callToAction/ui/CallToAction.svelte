<script lang="ts">
  import { HOME_EVENTS_HREF, HOME_SIGN_UP_HREF } from '../../config/homePageConfig'
</script>

<section class="cta-section">
  <div class="cta-inner">
    <h2 class="cta-title">今すぐ始めよう</h2>
    <p class="cta-desc">
      アカウント登録で、イベント情報の投稿や選手申請に参加できます。<br />
      閲覧だけなら登録不要です。
    </p>
    <div class="cta-actions">
      <a href={HOME_SIGN_UP_HREF} class="cta-btn cta-btn--primary">無料で登録する</a>
      <a href={HOME_EVENTS_HREF} class="cta-btn cta-btn--secondary">閲覧のみで使う</a>
    </div>
  </div>
</section>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .cta-section {
    padding: 80px 16px;
    background: linear-gradient(135deg, #{map.get($indigo, 600)} 0%, #{map.get($brand, 500)} 100%);
    text-align: center;
  }

  .cta-inner {
    max-width: 640px;
    place-self: center;
  }

  .cta-title {
    font-size: clamp(28px, 4vw, 36px);
    font-weight: map.get($font-weight, bold);
    color: #fff;
  }

  .cta-desc {
    font-size: map.get($font-size, base);
    color: rgb(255, 255, 255, 0.85);
    line-height: map.get($line-height, relaxed);
  }

  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: center;
    }
  }

  .cta-btn {
    display: inline-flex;
    padding: 12px 32px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    border-radius: map.get($radius, lg);
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .cta-btn--primary {
    display: inline-flex;
    padding: 12px 32px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    color: map.get($brand, 500);
    border-radius: map.get($radius, lg);
    background: #fff;
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
      background: rgb(255, 255, 255, 0.9);
    }
  }

  .cta-btn--secondary {
    display: inline-flex;
    padding: 12px 32px;
    font-size: map.get($font-size, base);
    font-weight: map.get($font-weight, semibold);
    color: #fff;
    border: 1.5px solid rgb(255, 255, 255, 0.5);
    border-radius: map.get($radius, lg);
    background: rgb(255, 255, 255, 0.1);
    transition:
      background map.get($transition, fast),
      transform map.get($transition, fast);
    align-items: center;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
      background: rgb(255, 255, 255, 0.2);
    }
  }
</style>
