import type { Snippet } from 'svelte'

import type { SheetSide } from './variants'

/** Sheet コンポーネントの入力。 */
export interface SheetProps {
  /** シートの表示方向。 */
  side?: SheetSide
  /** シート内に描画するコンテンツ。 */
  children: Snippet
  /** シートが閉じたタイミングで呼ぶコールバック。 */
  onClose?: () => void
}
