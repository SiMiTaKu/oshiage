<script lang="ts">
  import type { Snippet } from 'svelte'

  interface BadgeProps {
    /**
     * バッジの表示スタイル
     * - `default`: ブランドカラー（塗りつぶし）
     * - `secondary`: インディゴ系（補助情報）
     * - `outline`: 枠線のみ
     * - `destructive`: エラー系（削除・警告）
     * - `success`: 成功・完了
     * - `warning`: 注意・警告
     * @default 'default'
     */
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
    /** 追加 CSS クラス */
    class?: string
    /** バッジ内に描画するコンテンツ */
    children: Snippet
  }

  let { variant = 'default', class: className = '', children }: BadgeProps = $props()
</script>

<span class="badge badge--{variant} {className}">
  {@render children()}
</span>

<style lang="scss">
  @use 'sass:map';
  @use 'tokens' as t;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.625rem;
    border-radius: map.get(t.$radius, full);
    font-size: map.get(t.$font-size, xs);
    font-weight: map.get(t.$font-weight, semibold);
    line-height: map.get(t.$line-height, normal);
    border: 1px solid transparent;
    white-space: nowrap;

    &--default {
      background: map.get(t.$brand, 500);
      color: #fff;
    }

    &--secondary {
      background: map.get(t.$indigo, 100);
      color: map.get(t.$indigo, 700);
    }

    &--outline {
      background: transparent;
      color: map.get(t.$text, primary);
      border-color: map.get(t.$border, default);
    }

    &--destructive {
      background: map.get(t.$error, 100);
      color: map.get(t.$error, 500);
    }

    &--success {
      background: map.get(t.$success, 100);
      color: map.get(t.$success, 500);
    }

    &--warning {
      background: map.get(t.$warning, 100);
      color: map.get(t.$warning, 500);
    }
  }
</style>
