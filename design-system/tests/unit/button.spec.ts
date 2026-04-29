import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Button from '../../src/lib/button/button.svelte'

describe('Button', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('label テキストがボタンに表示されること', () => {
      // Given / When
      render(Button, { label: 'クリック' })

      // Then
      expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument()
    })

    it('type="button" が設定されること', () => {
      // Given / When
      render(Button, { label: 'テスト' })

      // Then
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })
  })
  // #endregion

  // #region tone
  describe('tone', () => {
    it('tone 未指定の場合は primary クラスが付与されること', () => {
      // Given / When
      const { container } = render(Button, { label: 'テスト' })

      // Then
      expect(container.querySelector('.primary')).toBeInTheDocument()
    })

    it('tone="primary" のとき primary クラスが付与されること', () => {
      // Given / When
      const { container } = render(Button, { label: 'テスト', tone: 'primary' })

      // Then
      expect(container.querySelector('.primary')).toBeInTheDocument()
    })

    it('tone="secondary" のとき secondary クラスが付与されること', () => {
      // Given / When
      const { container } = render(Button, { label: 'テスト', tone: 'secondary' })

      // Then
      expect(container.querySelector('.secondary')).toBeInTheDocument()
    })
  })
  // #endregion
})
