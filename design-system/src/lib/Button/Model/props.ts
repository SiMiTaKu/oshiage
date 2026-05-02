import type { ButtonVariant } from './variants'

/** Button コンポーネントの入力。 */
export interface ButtonProps {
  /** ボタンに表示するテキスト。 */
  label: string
  /** ボタンの見た目バリエーション。 */
  variant: ButtonVariant
  /** ボタンの type 属性。 */
  type?: 'button' | 'submit'
}
