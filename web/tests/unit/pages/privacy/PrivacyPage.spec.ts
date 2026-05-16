import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import PrivacyPage from '../../../../src/pages/privacy/ui/PrivacyPage.svelte'

describe('PrivacyPage', () => {
  describe('正常系 - ページ表示', () => {
    it('初期表示の場合、「プライバシーポリシー」見出しが表示されること', () => {
      // #region Given
      render(PrivacyPage)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'プライバシーポリシー', level: 1 })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('初期表示の場合、個人情報の収集についてのセクション見出しが表示されること', () => {
      // #region Given
      render(PrivacyPage)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '1. 個人情報の収集について' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })
  })
})
