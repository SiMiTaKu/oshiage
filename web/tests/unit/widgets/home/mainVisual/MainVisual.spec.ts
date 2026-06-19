import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import MainVisual from '../../../../../src/widgets/home/mainVisual/ui/MainVisual.svelte'

describe('MainVisual', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(MainVisual)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: /散らばった競技情報を、/ })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('イベントを探すボタンが正しいhrefで表示されること', () => {
      // #region Given
      render(MainVisual)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'イベントを探す' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })

    it('選手・チームを見るボタンが正しいhrefで表示されること', () => {
      // #region Given
      render(MainVisual)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: '選手・チームを見る' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/entities')
      // #endregion
    })
  })
})
