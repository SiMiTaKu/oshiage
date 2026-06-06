import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Button from '../../../src/lib/Button/Button.svelte'

const BASE_PROPS = {
  label: 'テスト',
  variant: 'primary' as const,
}

describe('Button', () => {
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

    it.each([
      ['未指定', {}, 'button'],
      ['button', { htmlType: 'button' }, 'button'],
      ['submit', { htmlType: 'submit' }, 'submit'],
    ] as const)('htmlType を %s で渡した場合、type が %s になること', (_, props, expectedType) => {
      // #region Given
      render(Button, { ...BASE_PROPS, ...props })
      // #endregion

      // #region Then
      expect(screen.getByRole('button', { name: 'テスト' })).toHaveAttribute('type', expectedType)
      // #endregion
    })

    it.each(['primary', 'secondary', 'primary-outline', 'secondary-outline'] as const)(
      'variant="%s" を渡した場合、data-variant に反映されること',
      (variant) => {
        // #region Given
        render(Button, { ...BASE_PROPS, variant })
        // #endregion

        // #region Then
        expect(screen.getByRole('button', { name: 'テスト' })).toHaveAttribute(
          'data-variant',
          variant,
        )
        // #endregion
      },
    )

    it('width と height を指定した場合、style 属性に設定されること', () => {
      // #region Given
      render(Button, { ...BASE_PROPS, width: 200, height: 100 })
      // #endregion

      // #region When
      const button = screen.getByRole('button', { name: 'テスト' })
      // #endregion

      // #region Then
      expect(button).toHaveStyle({
        width: '200px',
        height: '100px',
      })
      // #endregion
    })
    // #endregion
  })

  describe('準正常系', () => {
    it('label に空文字を渡した場合、button 要素が描画されること', () => {
      // #region Given
      render(Button, { ...BASE_PROPS, label: '' })
      // #endregion

      // #region Then
      expect(screen.getByRole('button')).toBeInTheDocument()
      // #endregion
    })
  })
})
