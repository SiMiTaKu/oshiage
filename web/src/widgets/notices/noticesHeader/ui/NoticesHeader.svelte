<script lang="ts">
  // 静的ヘッダー
</script>

<div class="page-header">
  <div class="page-header-inner">
    <h1 class="page-title">お知らせ</h1>
    <p class="page-desc">サービスに関する最新情報をお知らせします。</p>
  </div>
</div>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

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
    font-size: map.get($font-size, base);
    color: map.get($text, muted);
  }
</style>
