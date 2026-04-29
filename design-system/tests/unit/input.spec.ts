import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import Input from '../../src/lib/input/input.svelte'

describe('Input', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('label が表示されること', () => {
      // Given / When
      render(Input, { id: 'name', label: 'お名前' })

      // Then
      expect(screen.getByText('お名前')).toBeInTheDocument()
    })

    it('input 要素が描画されること', () => {
      // Given / When
      render(Input, {})

      // Then
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('placeholder が設定されること', () => {
      // Given / When
      render(Input, { placeholder: 'ここに入力' })

      // Then
      expect(screen.getByPlaceholderText('ここに入力')).toBeInTheDocument()
    })

    it('required のとき label に * が付与されること', () => {
      // Given / When
      render(Input, { id: 'email', label: 'メール', required: true })

      // Then
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })
  // #endregion

  // #region hint / error
  describe('hint / error 表示', () => {
    it('hint が表示されること', () => {
      // Given / When
      render(Input, { hint: '半角英数字で入力' })

      // Then
      expect(screen.getByText('半角英数字で入力')).toBeInTheDocument()
    })

    it('error が表示されること', () => {
      // Given / When
      render(Input, { error: '必須項目です' })

      // Then
      expect(screen.getByRole('alert')).toHaveTextContent('必須項目です')
    })

    it('error がある場合、hint は表示されないこと', () => {
      // Given / When
      render(Input, { error: 'エラー', hint: 'ヒント' })

      // Then
      expect(screen.queryByText('ヒント')).not.toBeInTheDocument()
    })

    it('error があるとき aria-invalid="true" が設定されること', () => {
      // Given / When
      render(Input, { id: 'f1', error: 'エラー' })

      // Then
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })
  // #endregion

  // #region disabled
  describe('disabled', () => {
    it('disabled=true のとき input が disabled になること', () => {
      // Given / When
      render(Input, { disabled: true })

      // Then
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })
  // #endregion

  // #region ブラー時トリム
  describe('ブラー時トリム', () => {
    it('blur イベント後に前後の空白がトリムされること', async () => {
      // Given
      const { component } = render(Input, { value: '  hello  ' })

      // When
      await fireEvent.blur(screen.getByRole('textbox'))

      // Then
      // blurイベント後に値がトリムされていること
      expect((screen.getByRole('textbox') as HTMLInputElement).value).not.toMatch(/^\s|\s$/)
    })
  })
  // #endregion
})
