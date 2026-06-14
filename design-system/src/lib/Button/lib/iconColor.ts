import type { IconColor } from '../../Icons/model/props'
import type { ButtonVariant } from '../model/variants'

/**
 * ボタンの variant に対応するデフォルトのアイコン色マップ。
 * @remarks 塗りつぶし系は白、アウトライン系はブランド色を使用する。
 */
const DEFAULT_ICON_COLORS: Record<ButtonVariant, IconColor> = {
  primary: 'white',
  'primary-outline': 'primary',
  secondary: 'white',
  'secondary-outline': 'secondary',
}

/**
 * ボタンの variant からアイコン色を解決する。
 * @param variant - ボタンの見た目バリエーション。
 * @param iconColor - 明示的に指定されたアイコン色。指定がある場合はそちらを優先。
 * @returns 使用するアイコン色。
 */
export const resolveIconColor = (variant: ButtonVariant, iconColor?: IconColor): IconColor =>
  iconColor ?? DEFAULT_ICON_COLORS[variant]
