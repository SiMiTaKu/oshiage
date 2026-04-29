import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import TabsRoot from '../../src/lib/tabs/tabs-root.svelte'

const makePanelSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const makeTabs = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `tab-${i + 1}`,
    label: `タブ ${i + 1}`,
  }))

describe('TabsRoot', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('tabs の数だけタブボタンが描画されること', () => {
      // Given / When
      render(TabsRoot, { tabs: makeTabs(3) })

      // Then
      expect(screen.getAllByRole('tab')).toHaveLength(3)
    })

    it('各タブのラベルが表示されること', () => {
      // Given / When
      render(TabsRoot, { tabs: makeTabs(2) })

      // Then
      expect(screen.getByText('タブ 1')).toBeInTheDocument()
      expect(screen.getByText('タブ 2')).toBeInTheDocument()
    })

    it('tablist ロールが存在すること', () => {
      // Given / When
      render(TabsRoot, { tabs: makeTabs(2) })

      // Then
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })
  })
  // #endregion

  // #region タブ選択
  describe('タブ選択', () => {
    it('activeTab に一致するタブが aria-selected="true" になること', () => {
      // Given / When
      render(TabsRoot, { tabs: makeTabs(2), activeTab: 'tab-2' })

      // Then
      const tabs = screen.getAllByRole('tab')
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    })

    it('タブをクリックすると aria-selected が更新されること', async () => {
      // Given
      render(TabsRoot, { tabs: makeTabs(2) })
      const tabs = screen.getAllByRole('tab')

      // When
      await fireEvent.click(tabs[1])

      // Then
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    })

    it('別のタブを選択すると前のタブの aria-selected が false になること', async () => {
      // Given
      render(TabsRoot, { tabs: makeTabs(2), activeTab: 'tab-1' })
      const tabs = screen.getAllByRole('tab')

      // When
      await fireEvent.click(tabs[1])

      // Then
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    })
  })
  // #endregion

  // #region パネル表示
  describe('パネル表示 (panelChildren)', () => {
    it('activeTab に一致するパネルが表示されること', () => {
      // Given / When
      render(TabsRoot, {
        tabs: makeTabs(2),
        activeTab: 'tab-1',
        panelChildren: {
          'tab-1': makePanelSnippet('パネル1'),
          'tab-2': makePanelSnippet('パネル2'),
        },
      })

      // Then
      const panels = screen.getAllByRole('tabpanel', { hidden: true })
      expect(panels[0]).not.toHaveAttribute('hidden')
      expect(panels[1]).toHaveAttribute('hidden')
    })

    it('タブをクリックすると対応パネルが表示されること', async () => {
      // Given
      render(TabsRoot, {
        tabs: makeTabs(2),
        activeTab: 'tab-1',
        panelChildren: {
          'tab-1': makePanelSnippet('パネル1'),
          'tab-2': makePanelSnippet('パネル2'),
        },
      })
      const tabButtons = screen.getAllByRole('tab')

      // When
      await fireEvent.click(tabButtons[1])

      // Then
      const panels = screen.getAllByRole('tabpanel', { hidden: true })
      expect(panels[0]).toHaveAttribute('hidden')
      expect(panels[1]).not.toHaveAttribute('hidden')
    })
  })
  // #endregion
})
