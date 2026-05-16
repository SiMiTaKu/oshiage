import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import FaqPage from '../../../../src/pages/faq/ui/FaqPage.svelte'

describe('FaqPage', () => {
  describe('正常系 - FAQリスト表示', () => {
    it('初期表示の場合、全FAQアイテムがボタンとして表示されること', () => {
      // #region Given
      render(FaqPage)
      // #endregion

      // #region When
      const buttons = screen.getAllByRole('button')
      // #endregion

      // #region Then
      expect(buttons.length).toBeGreaterThanOrEqual(7)
      // #endregion
    })

    it('初期状態の場合、全ボタンのaria-expandedがfalseであること', () => {
      // #region Given
      render(FaqPage)
      // #endregion

      // #region When
      const buttons = screen.getAllByRole('button')
      // #endregion

      // #region Then
      buttons.forEach((btn) => {
        expect(btn).toHaveAttribute('aria-expanded', 'false')
      })
      // #endregion
    })
  })

  describe('正常系 - アコーディオン開閉', () => {
    it('質問をクリックした場合、aria-expandedがtrueになること', async () => {
      // #region Given
      render(FaqPage)
      const btn = screen.getByRole('button', { name: '推しアゲとはどんなサービスですか？' })
      // #endregion

      // #region When
      await fireEvent.click(btn)
      // #endregion

      // #region Then
      expect(btn).toHaveAttribute('aria-expanded', 'true')
      // #endregion
    })

    it('展開済みの質問を再度クリックした場合、aria-expandedがfalseに戻ること', async () => {
      // #region Given
      render(FaqPage)
      const btn = screen.getByRole('button', { name: '推しアゲとはどんなサービスですか？' })
      await fireEvent.click(btn)
      // #endregion

      // #region When
      await fireEvent.click(btn)
      // #endregion

      // #region Then
      expect(btn).toHaveAttribute('aria-expanded', 'false')
      // #endregion
    })

    it('異なる2つの質問をクリックした場合、両方がaria-expanded="true"になること', async () => {
      // #region Given
      render(FaqPage)
      const btn1 = screen.getByRole('button', { name: '推しアゲとはどんなサービスですか？' })
      const btn2 = screen.getByRole('button', { name: '無料で利用できますか？' })
      // #endregion

      // #region When
      await fireEvent.click(btn1)
      await fireEvent.click(btn2)
      // #endregion

      // #region Then
      expect(btn1).toHaveAttribute('aria-expanded', 'true')
      expect(btn2).toHaveAttribute('aria-expanded', 'true')
      // #endregion
    })
  })
})
