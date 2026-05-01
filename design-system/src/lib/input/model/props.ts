import type { InputType } from './types'

/** Input コンポーネントの入力。 */
export interface InputProps {
  /** input 要素の id。 */
  id: string
  /** フォーム送信時の name。 */
  name: string
  /** 現在値。 */
  value: string
  /** input の type 属性。 */
  type: InputType
  /** ラベル文言。 */
  label: string
  /** プレースホルダー文言。 */
  placeholder: string
  /** バリデーションエラーメッセージ。 */
  error?: string
  /** 操作不可にするか。 */
  disabled?: boolean
  /** 必須項目か。 */
  required: boolean
}
