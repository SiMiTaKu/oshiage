/** アイコンコンポーネント共通プロパティ */
export interface IconProps {
  /** アイコンのサイズ（px）。width/height に適用される @default 24 */
  size?: number
  /** ストロークカラー。CSS カラー値または `currentColor` @default 'currentColor' */
  color?: string
  /** ストローク幅（px） @default 2 */
  strokeWidth?: number
  /** 追加 CSS クラス */
  class?: string
  /** アクセシブル名。指定した場合 role="img" が付与される */
  'aria-label'?: string
  /** 装飾目的の場合 `true`。aria-label がない場合のデフォルト @default true */
  'aria-hidden'?: boolean
}
