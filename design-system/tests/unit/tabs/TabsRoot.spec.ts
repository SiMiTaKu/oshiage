import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import TabsRoot from '../../../src/lib/tabs/TabsRoot.svelte'

const makePanelSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const makeTabs = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `tab-${i + 1}`,
    label: `タブ ${i + 1}`,
  }))

describe('TabsRoot', () => {
  // #region 正常系
  describe('正常系', () => {
    // #region 表示テスト
    it('tabs を3件渡した場合、tab ボタンが3件描画されること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(3) })
      // #endregion

      // #region Then
      expect(screen.getAllByRole('tab')).toHaveLength(3)
      // #endregion
    })

    it('tabs にラベルを渡した場合、各タブのラベルが表示されること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      // #endregion

      // #region Then
      expect(screen.getByText('タブ 1')).toBeInTheDocument()
      expect(screen.getByText('タブ 2')).toBeInTheDocument()
      // #endregion
    })

    it('tabs を渡した場合、tablist ロールが存在すること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      // #endregion

      // #region Then
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 準正常系
  describe('準正常系', () => {
    // #region ユーザー操作テスト
    it('初期表示の場合、先頭タブが aria-selected="true" になること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      // #endregion

      // #region Then
      const tabs = screen.getAllByRole('tab')
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
      // #endregion
    })

    it('2番目のタブをクリックした場合、aria-selected が更新されること', async () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      const tabs = screen.getAllByRole('tab')
      // #endregion

      // #region When
      await fireEvent.click(tabs[1])
      // #endregion

      // #region Then
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
      // #endregion
    })

    it('別のタブを選択した場合、前のタブの aria-selected が false になること', async () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      const tabs = screen.getAllByRole('tab')
      // #endregion

      // #region When
      await fireEvent.click(tabs[1])
      // #endregion

      // #region Then
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 異常系
  describe('異常系', () => {
    it('tabs が空の場合、tab が描画されないこと', () => {
      // #region Given
      render(TabsRoot, { tabs: [] })
      // #endregion

      // #region Then
      expect(screen.queryByRole('tab')).not.toBeInTheDocument()
      // #endregion
    })
  })
  // #endregion

  // #region 正常系
  describe('正常系: パネル表示', () => {
    // #region 表示テスト
    it('panelChildren を渡した場合、activeTab に一致するパネルが表示されること', () => {
      // #region Given
      render(TabsRoot, {
        tabs: makeTabs(2),
        panelChildren: {
          'tab-1': makePanelSnippet('パネル1'),
          'tab-2': makePanelSnippet('パネル2'),
        },
      })
      // #endregion

      // #region Then
      const panels = screen.getAllByRole('tabpanel', { hidden: true })
      expect(panels[0]).not.toHaveAttribute('hidden')
      expect(panels[1]).toHaveAttribute('hidden')
      // #endregion
    })

    it('2番目のタブをクリックした場合、対応パネルが表示されること', async () => {
      // #region Given
      render(TabsRoot, {
        tabs: makeTabs(2),
        panelChildren: {
          'tab-1': makePanelSnippet('パネル1'),
          'tab-2': makePanelSnippet('パネル2'),
        },
      })
      const tabButtons = screen.getAllByRole('tab')
      // #endregion

      // #region When
      await fireEvent.click(tabButtons[1])
      // #endregion

      // #region Then
      const panels = screen.getAllByRole('tabpanel', { hidden: true })
      expect(panels[0]).toHaveAttribute('hidden')
      expect(panels[1]).not.toHaveAttribute('hidden')
      // #endregion
    })
    // #endregion
  })
  // #endregion
})
