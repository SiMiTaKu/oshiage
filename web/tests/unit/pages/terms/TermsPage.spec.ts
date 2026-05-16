import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import TermsPage from '../../../../src/pages/terms/ui/TermsPage.svelte'

describe('TermsPage', () => {
  describe('正常系 - ページ表示', () => {
    it('初期表示の場合、「利用規約」見出しが表示されること', () => {
      // #region Given
      render(TermsPage)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '利用規約', level: 1 })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('初期表示の場合、第1条セクション見出しが表示されること', () => {
      // #region Given
      render(TermsPage)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '第1条（適用）' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })
  })
})
