import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Features from '../../../../../src/widgets/home/features/ui/Features.svelte'

describe('Features', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(Features)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '推しアゲでできること' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('各機能のカードが表示されること', () => {
      // #region Given
      render(Features)
      // #endregion

      // #region When
      const feature1 = screen.getByRole('heading', { name: 'イベント情報の集約' })
      const feature2 = screen.getByRole('heading', { name: '選手・チーム情報' })
      // #endregion

      // #region Then
      expect(feature1).toBeInTheDocument()
      expect(feature2).toBeInTheDocument()
      // #endregion
    })
  })
})
