import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Accordion from '../../../src/lib/accordion/Accordion.svelte'

const makeContentSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    summary: `タイトル ${i + 1}`,
    details: makeContentSnippet(`コンテンツ ${i + 1}`),
  }))

const BASE_ID = 'test-accordion'

describe('Accordion', () => {
  // #region 正常系
  describe('正常系', () => {
    // #region 表示テスト
    it('items を3件渡した場合、summary が3件描画されること', () => {
      // #region Given
      const { container } = render(Accordion, { id: BASE_ID, items: makeItems(3) })
      // #endregion

      // #region Then
      expect(container.querySelectorAll('summary')).toHaveLength(3)
      // #endregion
    })

    it('items にタイトルを渡した場合、各タイトルが表示されること', () => {
      // #region Given
      render(Accordion, { id: BASE_ID, items: makeItems(2) })
      // #endregion

      // #region Then
      expect(screen.getByText('タイトル 1')).toBeInTheDocument()
      expect(screen.getByText('タイトル 2')).toBeInTheDocument()
      // #endregion
    })

    it('初期表示の場合、すべてのパネルが閉じた状態になること', () => {
      // #region Given
      const { container } = render(Accordion, { id: BASE_ID, items: makeItems(2) })
      // #endregion

      // #region Then
      const details = container.querySelectorAll('details')
      details.forEach((item) => {
        expect(item).not.toHaveAttribute('open')
      })
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 準正常系
  describe('準正常系', () => {
    // #region ユーザー操作テスト
    it('summary をクリックした場合、対象パネルが開くこと', async () => {
      // #region Given
      const { container } = render(Accordion, { id: BASE_ID, items: makeItems(2) })
      const summaries = container.querySelectorAll('summary')
      const details = container.querySelectorAll('details')
      // #endregion

      // #region When
      await fireEvent.click(summaries[0])
      // #endregion

      // #region Then
      expect(details[0]).toHaveAttribute('open')
      // #endregion
    })

    it('別のパネルを開いた場合、直前のパネルが閉じること', async () => {
      // #region Given
      const { container } = render(Accordion, { id: BASE_ID, items: makeItems(2) })
      const summaries = container.querySelectorAll('summary')
      const details = container.querySelectorAll('details')
      await fireEvent.click(summaries[0])
      // #endregion

      // #region When
      await fireEvent.click(summaries[1])
      // #endregion

      // #region Then
      expect(details[0]).not.toHaveAttribute('open')
      expect(details[1]).toHaveAttribute('open')
      // #endregion
    })

    it('開いているパネルを再クリックした場合、同じパネルが閉じること', async () => {
      // #region Given
      const { container } = render(Accordion, { id: BASE_ID, items: makeItems(1) })
      const summary = container.querySelector('summary')
      const detail = container.querySelector('details')
      if (!summary || !detail) throw new Error('accordion item was not rendered')

      await fireEvent.click(summary)
      // #endregion

      // #region When
      await fireEvent.click(summary)
      // #endregion

      // #region Then
      expect(detail).not.toHaveAttribute('open')
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 異常系
  describe('異常系', () => {
    it('items が空の場合、summary が描画されないこと', () => {
      // #region Given
      const { container } = render(Accordion, { id: BASE_ID, items: [] })
      // #endregion

      // #region Then
      expect(container.querySelectorAll('summary')).toHaveLength(0)
      // #endregion
    })
  })
  // #endregion
})
