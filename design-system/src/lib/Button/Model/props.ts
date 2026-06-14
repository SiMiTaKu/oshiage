import type { IconColor } from '../../Icons/model/props'
import type { ButtonVariant } from './variants'

/** Button コンポーネント共通基底プロパティ。 */
interface ButtonBase {
  /** ボタンの見た目バリエーション。 */
  variant: ButtonVariant
  /** クリック時のコールバック。 */
  onclick?: (event: MouseEvent) => void
  /** ボタンの幅。 */
  width?: number
  /** ボタンの高さ。 */
  height?: number
}

/**
 * テキストのみを表示する button 要素プロパティ。
 * @remarks type: 'text' のとき適用される。
 */
export interface TextButtonProps extends ButtonBase {
  /** コンテンツ種類識別子。未指定時は 'text' 扱い。 */
  type?: 'text'
  /** ボタンに表示するテキスト。 */
  label: string
  /** button 要素の type 属性。未指定時は 'button'。 */
  htmlType?: 'button' | 'submit'
}

/**
 * アイコンのみを表示する button 要素プロパティ。
 * @remarks type: 'icon' のとき適用される。テキストがないためアクセシブル名が必須。
 */
export interface IconButtonProps extends ButtonBase {
  /** コンテンツ種類識別子。 */
  type: 'icon'
  /** 表示するアイコンのキー名。 */
  icon: import('../../Icons/config/icons').IconName
  /** スクリーンリーダー向けアクセシブル名。 */
  'aria-label': string
  /** アイコンの色。未指定時は variant から自動決定。 */
  iconColor?: IconColor
  /** button 要素の type 属性。未指定時は 'button'。 */
  htmlType?: 'button' | 'submit'
}

/**
 * アイコン+テキストを表示する button 要素プロパティ。
 * @remarks type: 'icon-text' のとき適用される。
 */
export interface IconTextButtonProps extends ButtonBase {
  /** コンテンツ種類識別子。 */
  type: 'icon-text'
  /** 表示するアイコンのキー名。 */
  icon: import('../../Icons/config/icons').IconName
  /** ボタンに表示するテキスト。 */
  label: string
  /** アイコンの色。未指定時は variant から自動決定。 */
  iconColor?: IconColor
  /** button 要素の type 属性。未指定時は 'button'。 */
  htmlType?: 'button' | 'submit'
}

/**
 * a 要素として描画するリンクボタンプロパティ。
 * @remarks type: 'link-button' のとき適用される。SEO・アクセシビリティ上 a タグが必要な場合に使用する。
 */
export interface LinkButtonProps extends ButtonBase {
  /** link-button を指定すると a タグで描画される。 */
  type: 'link-button'
  /** ボタンに表示するテキスト。 */
  label: string
  /** 遷移先 URL。 */
  href: string
}

/**
 * Button コンポーネントの入力。type によって描画要素とコンテンツが切り替わる。
 * @remarks
 * - 'text'      → テキストのみ、button 要素
 * - 'icon'      → アイコンのみ、button 要素（aria-label 必須）
 * - 'icon-text' → アイコン+テキスト、button 要素
 * - 'link-button' → テキストのみ、a 要素（href 必須）
 */
export type ButtonProps = TextButtonProps | IconButtonProps | IconTextButtonProps | LinkButtonProps
