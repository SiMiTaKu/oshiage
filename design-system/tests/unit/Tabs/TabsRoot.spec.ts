import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import TabsRoot from '../../../src/lib/Tabs/TabsRoot.svelte'

const makePanelSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const makeTabs = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `tab-${i + 1}`,
    label: `タブ ${i + 1}`,
  }))

const getPanelByTabName = (name: string) => {
  const tab = screen.getByRole('tab', { name })
  const panelId = tab.getAttribute('aria-controls')

  if (!panelId) {
    throw new Error(`aria-controls was not found for ${name}`)
  }

  const panel = document.getElementById(panelId)

  if (!(panel instanceof HTMLElement)) {
    throw new Error(`tabpanel was not found for ${name}`)
  }

  return panel
}

describe('TabsRoot', () => {
  describe('正常系', () => {
    // #region 表示テスト
    it('tabs を3件渡した場合、tab ボタンが3件描画されること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(3) })
      // #endregion

      // #region Then
      expect(screen.getByRole('tab', { name: 'タブ 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'タブ 2' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'タブ 3' })).toBeInTheDocument()
      // #endregion
    })

    it('tabs にラベルを渡した場合、各タブのラベルが表示されること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      // #endregion

      // #region Then
      expect(screen.getByRole('tab', { name: 'タブ 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'タブ 2' })).toBeInTheDocument()
      // #endregion
    })

    it('tabs を渡した場合、tablist ロールが存在すること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      // #endregion

      // #region Then
      expect(screen.getByRole('tablist', { name: 'タブ一覧' })).toBeInTheDocument()
      // #endregion
    })
    // #endregion

    // #region ユーザー操作テスト
    it('初期表示の場合、先頭タブが aria-selected="true" になること', () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      const firstTab = screen.getByRole('tab', { name: 'タブ 1' })
      const secondTab = screen.getByRole('tab', { name: 'タブ 2' })
      // #endregion

      // #region Then
      expect(firstTab).toHaveAttribute('aria-selected', 'true')
      expect(secondTab).toHaveAttribute('aria-selected', 'false')
      // #endregion
    })

    it('2番目のタブをクリックした場合、aria-selected が更新されること', async () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      const secondTab = screen.getByRole('tab', { name: 'タブ 2' })
      // #endregion

      // #region When
      await fireEvent.click(secondTab)
      // #endregion

      // #region Then
      expect(secondTab).toHaveAttribute('aria-selected', 'true')
      // #endregion
    })

    it('別のタブを選択した場合、前のタブの aria-selected が false になること', async () => {
      // #region Given
      render(TabsRoot, { tabs: makeTabs(2) })
      const firstTab = screen.getByRole('tab', { name: 'タブ 1' })
      const secondTab = screen.getByRole('tab', { name: 'タブ 2' })
      // #endregion

      // #region When
      await fireEvent.click(secondTab)
      // #endregion

      // #region Then
      expect(firstTab).toHaveAttribute('aria-selected', 'false')
      expect(secondTab).toHaveAttribute('aria-selected', 'true')
      // #endregion
    })

    it('panelChildren を渡した場合、activeTab に一致するパネルが表示されること', () => {
      // #region Given
      render(TabsRoot, {
        tabs: makeTabs(2),
        panelChildren: {
          'tab-1': makePanelSnippet('パネル1'),
          'tab-2': makePanelSnippet('パネル2'),
        },
      })
      const firstPanel = getPanelByTabName('タブ 1')
      const secondPanel = getPanelByTabName('タブ 2')
      // #endregion

      // #region Then
      expect(firstPanel).not.toHaveAttribute('hidden')
      expect(secondPanel).toHaveAttribute('hidden')
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
      const secondTab = screen.getByRole('tab', { name: 'タブ 2' })
      const firstPanel = getPanelByTabName('タブ 1')
      const secondPanel = getPanelByTabName('タブ 2')
      // #endregion

      // #region When
      await fireEvent.click(secondTab)
      // #endregion

      // #region Then
      expect(firstPanel).toHaveAttribute('hidden')
      expect(secondPanel).not.toHaveAttribute('hidden')
      // #endregion
    })
    // #endregion
  })

  describe('準正常系', () => {
    it('tabs が空の場合、tab が描画されないこと', () => {
      // #region Given
      render(TabsRoot, { tabs: [] })
      // #endregion

      // #region Then
      expect(screen.queryByRole('tab', { name: 'タブ 1' })).not.toBeInTheDocument()
      // #endregion
    })
  })
})
