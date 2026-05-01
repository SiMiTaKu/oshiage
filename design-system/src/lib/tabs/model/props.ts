import type { Snippet } from 'svelte'

import type { TabItem } from './item'

/** TabsRoot コンポーネントの入力。 */
export interface TabsRootProps {
  /** 表示するタブ一覧。 */
  tabs: TabItem[]
  /** タブ ID をキーに持つパネル Snippet。 */
  panelChildren?: Record<string, Snippet>
}

/** Tabs ラッパーコンポーネントの入力。 */
export interface TabsProps {
  /** タブ UI 全体を含むコンテンツ。 */
  children: Snippet
}
