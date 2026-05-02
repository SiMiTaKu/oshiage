import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Accordion from '../../../src/lib/Accordion/Accordion.svelte'

const makeContentSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    summary: `タイトル ${i + 1}`,
    details: makeContentSnippet(`コンテンツ ${i + 1}`),
  }))

const BASE_ID = 'test-accordion'

const getAccordionSummaryByName = (name: string) => {
  const panel = screen.getByRole('region', { name })
  const labelId = panel.getAttribute('aria-labelledby')

  if (!labelId) {
    throw new Error(`aria-labelledby was not found for ${name}`)
  }

  const summary = document.getElementById(labelId)

  if (!(summary instanceof HTMLElement)) {
    throw new Error(`summary was not found for ${name}`)
  }

  return summary
}

describe('Accordion', () => {
  describe('正常系', () => {
    // #region 表示テスト
    it('items を3件渡した場合、summary が3件描画されること', () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(3) })
      // #endregion

      // #region Then
      expect(screen.getByRole('region', { name: 'タイトル 1' })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: 'タイトル 2' })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: 'タイトル 3' })).toBeInTheDocument()
      // #endregion
    })

    it('items にタイトルを渡した場合、各タイトルが表示されること', () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(2) })
      // #endregion

      // #region Then
      expect(screen.getByRole('region', { name: 'タイトル 1' })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: 'タイトル 2' })).toBeInTheDocument()
      // #endregion
    })

    it('初期表示の場合、すべてのパネルが閉じた状態になること', () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(2) })
      // #endregion

      // #region Then
      expect(screen.getByRole('region', { name: 'タイトル 1' })).not.toBeVisible()
      expect(screen.getByRole('region', { name: 'タイトル 2' })).not.toBeVisible()
      // #endregion
    })
    // #endregion

    // #region ユーザー操作テスト
    it('summary をクリックした場合、対象パネルが開くこと', async () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(2) })
      const firstPanel = screen.getByRole('region', { name: 'タイトル 1' })
      const firstSummary = getAccordionSummaryByName('タイトル 1')
      // #endregion

      // #region When
      await fireEvent.click(firstSummary)
      // #endregion

      // #region Then
      expect(firstPanel).toBeVisible()
      // #endregion
    })

    it('別のパネルを開いた場合、直前のパネルが閉じること', async () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(2) })
      const firstPanel = screen.getByRole('region', { name: 'タイトル 1' })
      const secondPanel = screen.getByRole('region', { name: 'タイトル 2' })
      const firstSummary = getAccordionSummaryByName('タイトル 1')
      const secondSummary = getAccordionSummaryByName('タイトル 2')
      await fireEvent.click(firstSummary)
      // #endregion

      // #region When
      await fireEvent.click(secondSummary)
      // #endregion

      // #region Then
      expect(firstPanel).not.toBeVisible()
      expect(secondPanel).toBeVisible()
      // #endregion
    })

    it('開いているパネルを再クリックした場合、同じパネルが閉じること', async () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(1) })
      const panel = screen.getByRole('region', { name: 'タイトル 1' })
      const summary = getAccordionSummaryByName('タイトル 1')

      await fireEvent.click(summary)
      // #endregion

      // #region When
      await fireEvent.click(summary)
      // #endregion

      // #region Then
      expect(panel).not.toBeVisible()
      // #endregion
    })
    // #endregion
  })

  describe('準正常系', () => {
    it('items が空の場合、summary が描画されないこと', () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: [] })
      // #endregion

      // #region Then
      expect(screen.queryByRole('region', { name: 'タイトル 1' })).not.toBeInTheDocument()
      // #endregion
    })
  })
})
