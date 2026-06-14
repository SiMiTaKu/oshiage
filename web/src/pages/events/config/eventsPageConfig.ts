import { ROUTES } from '@shared/routes'

/**
 * イベント種別選択肢
 */
export const EVENT_TYPE_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: 'competition', label: '大会' },
  { value: 'exhibition', label: '発表会' },
  { value: 'practice', label: '練習会' },
  { value: 'workshop', label: 'ワークショップ' },
] as const

/**
 * イベント種別表示ラベルマップ
 */
export const EVENT_TYPE_LABELS: Record<string, string> = {
  competition: '大会',
  exhibition: '発表会',
  practice: '練習会',
  workshop: 'ワークショップ',
}

/**
 * イベント一覧ページタイトル
 */
export const EVENTS_PAGE_TITLE = 'イベント一覧'

/**
 * イベント詳細パンくずリンク
 */
export const EVENTS_BREADCRUMB_HREF = ROUTES.events.index
