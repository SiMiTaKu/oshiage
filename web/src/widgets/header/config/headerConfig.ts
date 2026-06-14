import { ROUTES } from '@shared/routes'

/**
 * ヘッダーメインナビゲーション定義
 *
 * @remarks
 * リンク先は ROUTES 定数から参照し、ハードコーディングを防ぐ。
 */
export const HEADER_NAVIGATION = [
  { name: 'イベント', href: ROUTES.events.index },
  { name: '選手・チーム', href: ROUTES.entities.index },
  { name: 'お知らせ', href: ROUTES.notices.index },
] as const
