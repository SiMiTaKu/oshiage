import { ROUTES } from '../../../shared/routes'

/**
 * エンティティカテゴリ選択肢
 */
export const CATEGORY_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: 'individual', label: '個人' },
  { value: 'group', label: 'グループ' },
] as const

/**
 * エンティティ活動状態選択肢
 */
export const STATUS_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: 'active', label: '現役' },
  { value: 'retired', label: '引退' },
  { value: 'inactive', label: '休止' },
] as const

/**
 * エンティティカテゴリ表示ラベルマップ
 */
export const CATEGORY_LABELS: Record<string, string> = {
  individual: '個人',
  group: 'グループ',
}

/**
 * エンティティ活動状態表示ラベルマップ
 */
export const STATUS_LABELS: Record<string, string> = {
  active: '現役',
  retired: '引退',
  inactive: '休止',
}

/**
 * エンティティ活動状態 CSS クラスマップ
 */
export const STATUS_COLORS: Record<string, string> = {
  active: 'badge-active',
  retired: 'badge-retired',
  inactive: 'badge-inactive',
}

/**
 * 選手・チーム一覧パンくずリンク
 */
export const ENTITIES_BREADCRUMB_HREF = ROUTES.entities.index
