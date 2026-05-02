import type { BadgeVariant } from './variants'

/** Badge コンポーネントの入力。 */
export interface BadgeProps {
  /** バッジの表示バリエーション。 */
  variant: BadgeVariant
  /** バッジに表示する文言。 */
  text: string
}
