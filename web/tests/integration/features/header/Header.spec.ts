import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'

const { mockPageStore } = vi.hoisted(() => ({
  mockPageStore: { subscribe: vi.fn() },
}))

vi.mock('$app/stores', () => ({ page: mockPageStore }))

import Header from '../../../../src/features/header/ui/Header.svelte'

describe('Header', () => {
  beforeEach(() => {
    mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
      fn({
        url: new URL('http://localhost/'),
        status: 200,
        error: null,
        params: {},
        route: { id: null },
        data: {},
      })
      return () => {}
    })
  })

  describe('正常系 - ナビゲーション', () => {
    it('初期表示の場合、イベントリンクが表示されること', () => {
      // #region Given
      render(Header)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'イベント' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })

    it('初期表示の場合、選手・チームリンクが表示されること', () => {
      // #region Given
      render(Header)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: '選手・チーム' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/entities')
      // #endregion
    })

    it('初期表示の場合、お知らせリンクが表示されること', () => {
      // #region Given
      render(Header)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'お知らせ' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/notices')
      // #endregion
    })

    it('初期表示の場合、ロゴリンクが表示されること', () => {
      // #region Given
      render(Header)
      // #endregion

      // #region When
      const logo = screen.getByRole('link', { name: '推しアゲ トップページ' })
      // #endregion

      // #region Then
      expect(logo).toHaveAttribute('href', '/')
      // #endregion
    })
  })

  describe('正常系 - モバイルメニュー', () => {
    it('初期状態の場合、メニューを開くボタンのaria-expandedがfalseであること', () => {
      // #region Given
      render(Header)
      // #endregion

      // #region When
      const btn = screen.getByRole('button', { name: 'メニューを開く' })
      // #endregion

      // #region Then
      expect(btn).toHaveAttribute('aria-expanded', 'false')
      // #endregion
    })

    it('メニューを開くボタンをクリックした場合、aria-expandedがtrueになること', async () => {
      // #region Given
      render(Header)
      const btn = screen.getByRole('button', { name: 'メニューを開く' })
      // #endregion

      // #region When
      await fireEvent.click(btn)
      // #endregion

      // #region Then
      expect(btn).toHaveAttribute('aria-expanded', 'true')
      // #endregion
    })

    it('メニューを開くボタンをクリックした場合、モバイルドロワーが表示されること', async () => {
      // #region Given
      render(Header)
      const btn = screen.getByRole('button', { name: 'メニューを開く' })
      // #endregion

      // #region When
      await fireEvent.click(btn)
      // #endregion

      // #region Then
      expect(screen.getByRole('dialog', { name: 'シート' })).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - アクティブリンク', () => {
    it('/eventsパスの場合、イベントリンクにaria-current="page"が設定されること', () => {
      // #region Given
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          url: new URL('http://localhost/events'),
          status: 200,
          error: null,
          params: {},
          route: { id: null },
          data: {},
        })
        return () => {}
      })
      render(Header)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'イベント' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('aria-current', 'page')
      // #endregion
    })

    it('ルートパスの場合、ナビゲーションリンクにaria-currentが設定されないこと', () => {
      // #region Given
      render(Header)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'イベント' })
      // #endregion

      // #region Then
      expect(link).not.toHaveAttribute('aria-current')
      // #endregion
    })
  })
})
