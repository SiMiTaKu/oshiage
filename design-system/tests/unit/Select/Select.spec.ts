import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Select from '../../../src/lib/Select/Select.svelte'

const BASE_PROPS = {
  id: 'category',
  name: 'category',
  value: '',
  label: 'カテゴリ',
  placeholder: '選択してください',
  required: true,
  items: [
    { label: '選択肢A', value: 'a' },
    { label: '選択肢B', value: 'b' },
  ],
}

describe('Select', () => {
  describe('正常系', () => {
    // #region 表示テスト
    it('基本 props を渡した場合、select と label が描画されること', () => {
      // #region Given
      render(Select, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByRole('combobox', { name: 'カテゴリ' })).toBeInTheDocument()
      // #endregion
    })

    it('required=true を渡した場合、label に * が付与されること', () => {
      // #region Given
      render(Select, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByRole('combobox', { name: 'カテゴリ' })).toBeRequired()
      // #endregion
    })

    it('placeholder を渡した場合、placeholder が option として描画されること', () => {
      // #region Given
      render(Select, BASE_PROPS)
      // #endregion

      // #region Then
      expect(screen.getByRole('option', { name: '選択してください' })).toBeInTheDocument()
      // #endregion
    })

    it('disabled=true を渡した場合、select が無効化されること', () => {
      // #region Given
      render(Select, { ...BASE_PROPS, disabled: true })
      // #endregion

      // #region Then
      expect(screen.getByRole('combobox', { name: 'カテゴリ' })).toBeDisabled()
      // #endregion
    })

    it('error を渡した場合、エラー表示と aria-invalid=true になること', () => {
      // #region Given
      render(Select, { ...BASE_PROPS, error: '選択してください' })
      // #endregion

      // #region Then
      expect(screen.getByRole('alert')).toHaveTextContent('選択してください')
      expect(screen.getByRole('combobox', { name: 'カテゴリ' })).toHaveAttribute(
        'aria-invalid',
        'true',
      )
      // #endregion
    })
    // #endregion
  })
})
