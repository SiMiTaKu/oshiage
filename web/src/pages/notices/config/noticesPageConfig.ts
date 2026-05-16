import { ROUTES } from '../../../shared/routes'

/**
 * お知らせ種別選択肢
 */
export const NOTICE_TYPE_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: 'specChange', label: '仕様変更' },
  { value: 'maintenance', label: 'メンテナンス' },
  { value: 'incident', label: 'インシデント' },
] as const

/**
 * お知らせ種別表示ラベルマップ
 */
export const NOTICE_TYPE_LABELS: Record<string, string> = {
  specChange: '仕様変更',
  maintenance: 'メンテナンス',
  incident: 'インシデント',
}

/**
 * お知らせ種別 CSS クラスマップ
 */
export const NOTICE_TYPE_COLORS: Record<string, string> = {
  specChange: 'badge-spec',
  maintenance: 'badge-maintenance',
  incident: 'badge-incident',
}

/**
 * お知らせ優先度 CSS クラスマップ
 */
export const NOTICE_PRIORITY_COLORS: Record<string, string> = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
}

/**
 * お知らせ優先度表示ラベルマップ
 */
export const NOTICE_PRIORITY_LABELS: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

/**
 * お知らせ一覧パンくずリンク
 */
export const NOTICES_BREADCRUMB_HREF = ROUTES.notices.index
