import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Accordion from '../../src/lib/accordion/accordion.svelte'

const makeContentSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    title: `タイトル ${i + 1}`,
    content: makeContentSnippet(`コンテンツ ${i + 1}`),
  }))

describe('Accordion', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('items の数だけボタンが描画されること', () => {
      // Given / When
      render(Accordion, { items: makeItems(3) })

      // Then
      expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('各項目のタイトルが表示されること', () => {
      // Given / When
      render(Accordion, { items: makeItems(2) })

      // Then
      expect(screen.getByText('タイトル 1')).toBeInTheDocument()
      expect(screen.getByText('タイトル 2')).toBeInTheDocument()
    })

    it('初期状態ではすべてのパネルが hidden であること', () => {
      // Given / When
      const { container } = render(Accordion, { items: makeItems(2) })

      // Then
      const panels = container.querySelectorAll('.accordion-panel')
      panels.forEach((panel) => {
        expect(panel).toHaveAttribute('hidden')
      })
    })
  })
  // #endregion

  // #region 開閉動作 (allowMultiple=false)
  describe('開閉動作 (allowMultiple=false デフォルト)', () => {
    it('ボタンをクリックするとパネルが開くこと', async () => {
      // Given
      render(Accordion, { items: makeItems(2) })
      const buttons = screen.getAllByRole('button')

      // When
      await fireEvent.click(buttons[0])

      // Then
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
    })

    it('別のパネルを開くと前のパネルが閉じること', async () => {
      // Given
      render(Accordion, { items: makeItems(2) })
      const buttons = screen.getAllByRole('button')
      await fireEvent.click(buttons[0])

      // When
      await fireEvent.click(buttons[1])

      // Then
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
    })

    it('開いているパネルを再クリックすると閉じること', async () => {
      // Given
      render(Accordion, { items: makeItems(1) })
      const button = screen.getByRole('button')
      await fireEvent.click(button)

      // When
      await fireEvent.click(button)

      // Then
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })
  // #endregion

  // #region 開閉動作 (allowMultiple=true)
  describe('開閉動作 (allowMultiple=true)', () => {
    it('複数パネルを同時に開けること', async () => {
      // Given
      render(Accordion, { items: makeItems(2), allowMultiple: true })
      const buttons = screen.getAllByRole('button')

      // When
      await fireEvent.click(buttons[0])
      await fireEvent.click(buttons[1])

      // Then
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
    })
  })
  // #endregion
})
