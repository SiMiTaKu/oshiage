import type { IconColor } from './props'

/** アイコン色トークン定義。 */
const ICON_COLORS: Record<IconColor, string> = {
  primary: '#ff6b35',
  secondary: '#4338ca',
  gray: '#6b7280',
  error: '#ef4444',
  white: '#ffffff',
  success: '#10b981',
  warning: '#f59e0b',
}

/**
 * 色名から実際のカラーコードを取得する。
 *
 * @remarks アイコン色はデザインシステムで許可された `IconColor` のみを受け付ける。
 * @param color - 取得対象の色名。未指定時は `primary`。
 * @returns CSS で利用する16進カラーコード。
 */
export const getIconColor = (color: IconColor = 'primary') => ICON_COLORS[color]
