import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Sheet from '../../../src/lib/Sheet/Sheet.svelte'

const makeChildrenSnippet = (text: string) =>
  createRawSnippet(() => ({ render: () => `<p>${text}</p>` }))

const BASE_PROPS = {
  children: makeChildrenSnippet('シートの中身'),
}

describe('Sheet', () => {
  // #region 正常系
  describe('正常系', () => {
    // #region 表示テスト
    it('コンポーネントをマウントした場合、dialog と children が表示されること', () => {
      // #region Given
      render(Sheet, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('シートの中身')).toBeInTheDocument()
      // #endregion
    })

    it.each(['left', 'right', 'bottom'] as const)(
      'side="%s" を渡した場合、data-side に反映されること',
      (side) => {
        // #region Given
        const { container } = render(Sheet, {
          ...BASE_PROPS,
          side,
          children: makeChildrenSnippet(''),
        })
        // #endregion

        // #region Then
        expect(container.querySelector(`.sheet[data-side="${side}"]`)).toBeInTheDocument()
        // #endregion
      },
    )
    // #endregion
  })
  // #endregion

  // #region 異常系
  describe('異常系', () => {
    // #region 表示テスト
    it('閉じるボタンを押下した場合、dialog が表示されないこと', async () => {
      // #region Given
      render(Sheet, { ...BASE_PROPS, children: makeChildrenSnippet('コンテンツ') })
      // #endregion

      // #region When
      await fireEvent.click(screen.getByRole('button', { name: '閉じる' }))
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 準正常系
  describe('準正常系', () => {
    // #region ユーザー操作テスト
    it('閉じるボタンをクリックした場合、dialog が非表示になること', async () => {
      // #region Given
      render(Sheet, { ...BASE_PROPS, children: makeChildrenSnippet('') })
      const closeButton = screen.getByRole('button', { name: '閉じる' })
      // #endregion

      // #region When
      await fireEvent.click(closeButton)
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      // #endregion
    })

    it('バックドロップをクリックした場合、dialog が非表示になること', async () => {
      // #region Given
      const { container } = render(Sheet, {
        ...BASE_PROPS,
        children: makeChildrenSnippet(''),
      })
      const backdrop = container.querySelector('.sheet-backdrop')!
      // #endregion

      // #region When
      await fireEvent.click(backdrop)
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      // #endregion
    })

    it('onClose を渡して閉じるボタンをクリックした場合、onClose が呼ばれること', async () => {
      // #region Given
      const onClose = vi.fn()
      render(Sheet, { ...BASE_PROPS, children: makeChildrenSnippet(''), onClose })
      const closeButton = screen.getByRole('button', { name: '閉じる' })
      // #endregion

      // #region When
      await fireEvent.click(closeButton)
      // #endregion

      // #region Then
      expect(onClose).toHaveBeenCalledOnce()
      // #endregion
    })

    it('Escape キーを押下した場合、dialog が非表示になること', async () => {
      // #region Given
      render(Sheet, BASE_PROPS)
      // #endregion

      // #region When
      await fireEvent.keyDown(window, { key: 'Escape' })
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      // #endregion
    })
    // #endregion
  })
  // #endregion
})
