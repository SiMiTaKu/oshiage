import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import CallToAction from '../../../../../src/widgets/home/callToAction/ui/CallToAction.svelte'

describe('CallToAction', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(CallToAction)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '今すぐ始めよう' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('無料で登録するボタンが正しいhrefで表示されること', () => {
      // #region Given
      render(CallToAction)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: '無料で登録する' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/auth/sign-up')
      // #endregion
    })

    it('閲覧のみで使うボタンが正しいhrefで表示されること', () => {
      // #region Given
      render(CallToAction)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: '閲覧のみで使う' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })
  })
})
