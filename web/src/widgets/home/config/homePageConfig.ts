import { ROUTES } from '@shared/routes'

// @ts-expect-error: vite-imagetools query string imports are handled by Vite
import hero1 from '../images/hero-1.jpg?w=1200&format=webp&url'
// @ts-expect-error: vite-imagetools query string imports are handled by Vite
import hero2 from '../images/hero-2.jpg?w=1200&format=webp&url'
// @ts-expect-error: vite-imagetools query string imports are handled by Vite
import hero3 from '../images/hero-3.jpg?w=1200&format=webp&url'

/**
 * ホームページ ヒーロー背景画像リスト（10秒ローテーション）
 */
export const HERO_IMAGES = [hero1, hero2, hero3] as const

/**
 * ホームページ 機能紹介セクション項目
 *
 * @remarks
 * icon はデザインシステムのアイコンコンポーネントを渡す前提のため、
 * 型は Component 型ではなく any で受け付け、呼び出し側でインポートする。
 */
export const HOME_FEATURES = [
  {
    title: 'イベント情報の集約',
    description:
      '大会・発表会・練習会など、男子新体操に関するすべてのイベント情報を一箇所で確認できます。日程・会場・参加費まで網羅。',
  },
  {
    title: '選手・チーム情報',
    description:
      '選手やチームのプロフィール、実績、所属先を検索可能。断片的だった情報が、体系的なデータベースに。',
  },
  {
    title: '本人確認済み情報',
    description:
      '選手・チーム本人によるClaim（認証）システム。公式情報として信頼性の高いデータを提供します。',
  },
  {
    title: '情報の継続的な更新',
    description:
      'ファンコミュニティによる情報の追加・修正。最新の情報が常に反映される、生きたデータベース。',
  },
] as const

/**
 * ホームページ 統計表示項目
 */
export const HOME_STATS = [
  { value: '50+', label: '登録イベント' },
  { value: '120+', label: '選手・チーム' },
  { value: '1,000+', label: '情報更新' },
  { value: 'β', label: 'サービス段階' },
] as const

/**
 * ホームページ イベントプレビューリンク
 */
export const HOME_EVENTS_HREF = ROUTES.events.index

/**
 * ホームページ 選手・チームプレビューリンク
 */
export const HOME_ENTITIES_HREF = ROUTES.entities.index

/**
 * ホームページ CTA 新規登録リンク
 */
export const HOME_SIGN_UP_HREF = ROUTES.auth.signUp
