/** アイコンで許可する色名。 */
export type IconColor = 'primary' | 'secondary' | 'gray' | 'error' | 'white' | 'success' | 'warning'

/** アイコンコンポーネント共通プロパティ。 */
export interface IconProps {
  /** アイコンサイズ。width / height に適用する。 */
  size: number
  /** ブランドトークンベースの色指定。 */
  color: IconColor
  /** アクセシブル名。 */
  'aria-label'?: string
}
