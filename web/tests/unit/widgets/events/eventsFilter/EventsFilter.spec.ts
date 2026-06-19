import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EventsFilter from '../../../../../src/widgets/events/eventsFilter/ui/EventsFilter.svelte'

describe('EventsFilter', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、セレクトボックスが表示されること', () => {
      // #region Given
      render(EventsFilter, {
        props: {
          selectedType: '',
          onchange: () => {},
        },
      })
      // #endregion

      // #region When
      const select = screen.getByRole('combobox', { name: '種別' })
      // #endregion

      // #region Then
      expect(select).toBeInTheDocument()
      // #endregion
    })
  })
})
