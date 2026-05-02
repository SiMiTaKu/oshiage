import type { AccordionItem } from './item'

/** Accordion コンポーネントの入力。 */
export interface AccordionProps {
  /** id */
  id: string
  /** 描画対象の項目一覧。 */
  items: AccordionItem[]
}
