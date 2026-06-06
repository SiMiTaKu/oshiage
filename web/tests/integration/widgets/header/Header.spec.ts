import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/svelte'
import Header from '../../../../src/widgets/header/ui/Header.svelte'

const { mockPageStore } = vi.hoisted(() => ({
  mockPageStore: { subscribe: vi.fn() },
}))

vi.mock('$app/stores', () => ({ page: mockPageStore }))

describe('Header', () => {
  describe('正常系 - PC表示', () => {
    beforeEach(() => {
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          url: new URL('http://localhost/'),
          status: 200,
          error: null,
          params: {},
          route: { id: null },
          data: { isMobile: false },
        })
        return () => {}
      })
    })

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

    it('/eventsパスの場合、イベントリンクにaria-current="page"が設定されること', () => {
      // #region Given
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          url: new URL('http://localhost/events'),
          status: 200,
          error: null,
          params: {},
          route: { id: null },
          data: { isMobile: false },
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

  describe('正常系 - モバイル表示', () => {
    beforeEach(() => {
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          url: new URL('http://localhost/'),
          status: 200,
          error: null,
          params: {},
          route: { id: null },
          data: { isMobile: true },
        })
        return () => {}
      })
    })

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

    it('モバイルドロワーで閉じるボタンをクリックした場合、モバイルドロワーが閉じること', async () => {
      // #region Given
      render(Header)
      const openBtn = screen.getByRole('button', { name: 'メニューを開く' })
      await fireEvent.click(openBtn)
      expect(screen.getByRole('dialog', { name: 'シート' })).toBeInTheDocument()
      // #endregion

      // #region When
      const closeBtn = screen.getByRole('button', { name: '閉じる' })
      await fireEvent.click(closeBtn)
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog', { name: 'シート' })).not.toBeInTheDocument()
      expect(openBtn).toHaveAttribute('aria-expanded', 'false')
      // #endregion
    })

    it('モバイルドロワーでナビゲーションリンクをクリックした場合、モバイルドロワーが閉じること', async () => {
      // #region Given
      render(Header)
      const openBtn = screen.getByRole('button', { name: 'メニューを開く' })
      await fireEvent.click(openBtn)
      const mobileNav = screen.getByRole('navigation', { name: 'モバイルナビゲーション' })
      const link = within(mobileNav).getByRole('link', { name: 'イベント' })
      // #endregion

      // #region When
      await fireEvent.click(link)
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog', { name: 'シート' })).not.toBeInTheDocument()
      expect(openBtn).toHaveAttribute('aria-expanded', 'false')
      // #endregion
    })

    it('モバイルドロワーでログインボタンをクリックした場合、モバイルドロワーが閉じること', async () => {
      // #region Given
      render(Header)
      const openBtn = screen.getByRole('button', { name: 'メニューを開く' })
      await fireEvent.click(openBtn)
      const drawer = screen.getByRole('dialog', { name: 'シート' })
      const loginBtn = within(drawer).getByRole('link', { name: 'ログイン' })
      // #endregion

      // #region When
      await fireEvent.click(loginBtn)
      // #endregion

      // #region Then
      expect(screen.queryByRole('dialog', { name: 'シート' })).not.toBeInTheDocument()
      expect(openBtn).toHaveAttribute('aria-expanded', 'false')
      // #endregion
    })
  })
})
