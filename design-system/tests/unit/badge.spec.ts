import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Badge from '../../src/lib/badge/badge.svelte'

const makeChildrenSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<span>${text}</span>` }))

describe('Badge', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('children が描画されること', () => {
      // Given / When
      render(Badge, { children: makeChildrenSnippet('テスト') })

      // Then
      expect(screen.getByText('テスト')).toBeInTheDocument()
    })

    it('variant 未指定の場合は badge--default クラスが付与されること', () => {
      // Given / When
      const { container } = render(Badge, { children: makeChildrenSnippet('') })

      // Then
      expect(container.querySelector('.badge--default')).toBeInTheDocument()
    })
  })
  // #endregion

  // #region variant
  describe('variant', () => {
    const variants = [
      'default',
      'secondary',
      'outline',
      'destructive',
      'success',
      'warning',
    ] as const

    for (const variant of variants) {
      it(`variant="${variant}" のとき badge--${variant} クラスが付与されること`, () => {
        // Given / When
        const { container } = render(Badge, {
          variant,
          children: makeChildrenSnippet(''),
        })

        // Then
        expect(container.querySelector(`.badge--${variant}`)).toBeInTheDocument()
      })
    }
  })
  // #endregion

  // #region class prop
  describe('class prop', () => {
    it('追加クラスが span に付与されること', () => {
      // Given / When
      const { container } = render(Badge, {
        class: 'custom-class',
        children: makeChildrenSnippet(''),
      })

      // Then
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })
  })
  // #endregion
})
