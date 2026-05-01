import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Button from '../../../src/lib/button/Button.svelte'

const BASE_PROPS = {
  label: 'テスト',
  variant: 'primary' as const,
}

describe('Button', () => {
  // #region 正常系
  describe('正常系', () => {
    // #region 表示テスト
    it('label を渡した場合、button にラベルが表示されること', () => {
      // #region Given
      render(Button, { ...BASE_PROPS, label: 'クリック' })
      // #endregion

      // #region Then
      expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument()
      // #endregion
    })

    it('type を未指定で渡した場合、type が button になること', () => {
      // #region Given
      render(Button, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 異常系
  describe('異常系', () => {
    it('label に空文字を渡した場合、button 要素が描画されること', () => {
      // #region Given
      render(Button, { ...BASE_PROPS, label: '' })
      // #endregion

      // #region Then
      expect(screen.getByRole('button')).toBeInTheDocument()
      // #endregion
    })
  })
  // #endregion

  // #region 準正常系
  describe('準正常系', () => {
    // #region 表示テスト
    it('variant を primary で渡した場合、data-variant に反映されること', () => {
      // #region Given
      render(Button, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary')
      // #endregion
    })

    it.each(['primary', 'secondary', 'primary-outline', 'secondary-outline'] as const)(
      'variant="%s" を渡した場合、data-variant に反映されること',
      (variant) => {
        // #region Given
        render(Button, { ...BASE_PROPS, variant })
        // #endregion

        // #region Then
        expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
        // #endregion
      },
    )
    // #endregion
  })
  // #endregion
})
