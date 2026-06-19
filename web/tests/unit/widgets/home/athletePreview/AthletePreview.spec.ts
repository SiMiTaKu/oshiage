import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import AthletePreview from '../../../../../src/widgets/home/athletePreview/ui/AthletePreview.svelte'

describe('AthletePreview', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(AthletePreview)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '選手・チーム' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('すべて見るリンクが正しいhrefで表示されること', () => {
      // #region Given
      render(AthletePreview)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: /すべて見る/ })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/entities')
      // #endregion
    })
  })
})
