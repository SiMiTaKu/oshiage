import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Sheet from '../../src/lib/sheet/sheet.svelte'

const makeChildrenSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

describe('Sheet', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('open=true のとき dialog が表示されること', () => {
      // Given / When
      render(Sheet, { open: true, children: makeChildrenSnippet('コンテンツ') })

      // Then
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('open=false のとき dialog が表示されないこと', () => {
      // Given / When
      render(Sheet, { open: false, children: makeChildrenSnippet('コンテンツ') })

      // Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('children が描画されること', () => {
      // Given / When
      render(Sheet, { open: true, children: makeChildrenSnippet('シートの中身') })

      // Then
      expect(screen.getByText('シートの中身')).toBeInTheDocument()
    })

    it('side prop がクラスに反映されること', () => {
      // Given / When
      const { container } = render(Sheet, {
        open: true,
        side: 'right',
        children: makeChildrenSnippet(''),
      })

      // Then
      expect(container.querySelector('.sheet--right')).toBeInTheDocument()
    })
  })
  // #endregion

  // #region 閉じる操作
  describe('閉じる操作', () => {
    it('閉じるボタンをクリックすると dialog が非表示になること', async () => {
      // Given
      render(Sheet, { open: true, children: makeChildrenSnippet('') })
      const closeButton = screen.getByRole('button', { name: '閉じる' })

      // When
      await fireEvent.click(closeButton)

      // Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('バックドロップをクリックすると dialog が非表示になること', async () => {
      // Given
      const { container } = render(Sheet, {
        open: true,
        children: makeChildrenSnippet(''),
      })
      const backdrop = container.querySelector('.sheet-backdrop')!

      // When
      await fireEvent.click(backdrop)

      // Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('onClose コールバックが呼ばれること', async () => {
      // Given
      const onClose = vi.fn()
      render(Sheet, { open: true, children: makeChildrenSnippet(''), onClose })
      const closeButton = screen.getByRole('button', { name: '閉じる' })

      // When
      await fireEvent.click(closeButton)

      // Then
      expect(onClose).toHaveBeenCalledOnce()
    })
  })
  // #endregion
})
