import type { Snippet } from 'svelte'

/** アコーディオンの項目定義。 */
export interface AccordionItem {
  /** サマリー行に表示するテキスト。 */
  summary: string
  /** 展開領域に表示する詳細コンテンツ。 */
  details: Snippet
}
