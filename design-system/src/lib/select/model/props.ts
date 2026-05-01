import type { SelectItem } from './item'

/** Select コンポーネントの入力。 */
export interface SelectProps {
  /** select 要素の id。 */
  id: string
  /** フォーム送信時の name。 */
  name: string
  /** 現在値。 */
  value: string
  /** ラベル文言。 */
  label: string
  /** 未選択時の文言。 */
  placeholder: string
  /** 選択肢一覧。 */
  items: SelectItem[]
  /** バリデーションエラーメッセージ。 */
  error?: string
  /** 操作不可にするか。 */
  disabled?: boolean
  /** 必須項目か。 */
  required: boolean
}
