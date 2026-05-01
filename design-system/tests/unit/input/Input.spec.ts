import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import Input from '../../../src/lib/input/Input.svelte'

const BASE_PROPS = {
  id: 'name',
  name: 'name',
  value: '',
  type: 'text' as const,
  label: 'お名前',
  placeholder: '入力してください',
  required: true,
}

describe('Input', () => {
  // #region 正常系
  describe('正常系', () => {
    // #region 表示テスト
    it('基本 props を渡した場合、label と input が表示されること', () => {
      // #region Given
      render(Input, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByText('お名前')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      // #endregion
    })

    it('required=true を渡した場合、label に * が付与されること', () => {
      // #region Given
      render(Input, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByText('*')).toBeInTheDocument()
      // #endregion
    })
    // #endregion

    // #region ユーザー操作テスト
    it('前後に空白を含む値を入力した場合、blur 後にトリムされること', async () => {
      // #region Given
      render(Input, { ...BASE_PROPS, value: '  hello  ' })
      // #endregion

      // #region When
      await fireEvent.blur(screen.getByRole('textbox'))
      // #endregion

      // #region Then
      expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('hello')
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 異常系
  describe('異常系', () => {
    // #region 表示テスト
    it('error を渡した場合、エラーメッセージと aria-invalid=true が表示されること', () => {
      // #region Given
      render(Input, { ...BASE_PROPS, error: '必須項目です' })
      // #endregion

      // #region Then
      expect(screen.getByRole('alert')).toHaveTextContent('必須項目です')
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
      // #endregion
    })
    // #endregion
  })
  // #endregion

  // #region 準正常系
  describe('準正常系', () => {
    // #region 表示テスト
    it('placeholder を渡した場合、placeholder が表示されること', () => {
      // #region Given
      render(Input, { ...BASE_PROPS, placeholder: 'ここに入力' })
      // #endregion

      // #region Then
      expect(screen.getByPlaceholderText('ここに入力')).toBeInTheDocument()
      // #endregion
    })

    it('disabled=true を渡した場合、input が無効化されること', () => {
      // #region Given
      render(Input, { ...BASE_PROPS, disabled: true })
      // #endregion

      // #region Then
      expect(screen.getByRole('textbox')).toBeDisabled()
      // #endregion
    })
    // #endregion
  })
  // #endregion
})
