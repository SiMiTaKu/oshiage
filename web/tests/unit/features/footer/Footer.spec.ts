import dayjs from 'dayjs'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Footer from '../../../../src/features/footer/ui/Footer.svelte'

describe('Footer', () => {
  describe('正常系 - サービスリンク', () => {
    it('イベント一覧リンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'イベント一覧' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })

    it('選手・チーム一覧リンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: '選手・チーム一覧' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/entities')
      // #endregion
    })

    it('お知らせリンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'お知らせ' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/notices')
      // #endregion
    })
  })

  describe('正常系 - サポートリンク', () => {
    it('よくある質問リンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'よくある質問' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/faq')
      // #endregion
    })

    it('お問い合わせリンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'お問い合わせ' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/contact')
      // #endregion
    })
  })

  describe('正常系 - 法的情報リンク', () => {
    it('利用規約リンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: '利用規約' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/terms')
      // #endregion
    })

    it('プライバシーポリシーリンクが正しいhrefで表示されること', () => {
      // #region Given
      render(Footer)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'プライバシーポリシー' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/privacy')
      // #endregion
    })
  })

  describe('正常系 - コピーライト', () => {
    it('コピーライトに現在年が含まれること', () => {
      // #region Given
      render(Footer)
      const currentYear = dayjs().toDate().getFullYear()
      // #endregion

      // #region When
      const copyright = screen.getByText(new RegExp(`${currentYear} 推しアゲ`))
      // #endregion

      // #region Then
      expect(copyright).toBeInTheDocument()
      // #endregion
    })
  })
})
