import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Select from '../../src/lib/select/select.svelte'

const makeOptionsSnippet = () =>
  createRawSnippet(() => ({
    render: () => `<option value="a">選択肢A</option>`,
  }))

describe('Select', () => {
  // #region レンダリング
  describe('レンダリング', () => {
    it('select 要素が描画されること', () => {
      // Given / When
      render(Select, { children: makeOptionsSnippet() })

      // Then
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('label が表示されること', () => {
      // Given / When
      render(Select, { id: 'cat', label: 'カテゴリ', children: makeOptionsSnippet() })

      // Then
      expect(screen.getByText('カテゴリ')).toBeInTheDocument()
    })

    it('placeholder が option として描画されること', () => {
      // Given / When
      render(Select, { placeholder: '選択してください', children: makeOptionsSnippet() })

      // Then
      expect(screen.getByText('選択してください')).toBeInTheDocument()
    })

    it('required のとき label に * が付与されること', () => {
      // Given / When
      render(Select, {
        id: 'cat',
        label: 'カテゴリ',
        required: true,
        children: makeOptionsSnippet(),
      })

      // Then
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })
  // #endregion

  // #region hint / error
  describe('hint / error 表示', () => {
    it('hint が表示されること', () => {
      // Given / When
      render(Select, { hint: '種別を選択', children: makeOptionsSnippet() })

      // Then
      expect(screen.getByText('種別を選択')).toBeInTheDocument()
    })

    it('error が表示されること', () => {
      // Given / When
      render(Select, { error: '選択してください', children: makeOptionsSnippet() })

      // Then
      expect(screen.getByRole('alert')).toHaveTextContent('選択してください')
    })

    it('error がある場合、hint は表示されないこと', () => {
      // Given / When
      render(Select, {
        error: 'エラー',
        hint: 'ヒント',
        children: makeOptionsSnippet(),
      })

      // Then
      expect(screen.queryByText('ヒント')).not.toBeInTheDocument()
    })

    it('error があるとき aria-invalid="true" が設定されること', () => {
      // Given / When
      render(Select, { id: 'f1', error: 'エラー', children: makeOptionsSnippet() })

      // Then
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
    })
  })
  // #endregion

  // #region disabled
  describe('disabled', () => {
    it('disabled=true のとき select が disabled になること', () => {
      // Given / When
      render(Select, { disabled: true, children: makeOptionsSnippet() })

      // Then
      expect(screen.getByRole('combobox')).toBeDisabled()
    })
  })
  // #endregion
})
