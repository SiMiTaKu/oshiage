import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Badge from '../../../src/lib/Badge/Badge.svelte'

const BASE_PROPS = {
  text: 'テスト',
  variant: 'primary' as const,
}

describe('Badge', () => {
  describe('正常系', () => {
    // #region 表示テスト
    it('text を渡した場合、text が描画されること', () => {
      // #region Given
      render(Badge, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByText('テスト')).toBeInTheDocument()
      // #endregion
    })

    it.each([
      'primary',
      'secondary',
      'primary-outline',
      'secondary-outline',
      'destructive',
      'success',
      'warning',
    ] as const)('variant="%s" を渡した場合、data-variant に反映されること', (variant) => {
      // #region Given
      render(Badge, { variant, text: variant })
      // #endregion

      // #region Then
      expect(screen.getByText(variant).closest('.badge')).toHaveAttribute('data-variant', variant)
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 異常系
  describe('準正常系', () => {
    // #region 表示テスト
    it('text に空文字を渡した場合、badge 要素が描画されること', () => {
      // #region Given
      const { container } = render(Badge, { ...BASE_PROPS, text: '' })
      // #endregion

      // #region Then
      expect(container.querySelector('.badge')).toBeInTheDocument()
      // #endregion
    })
    // #endregion
  })
})
