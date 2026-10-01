import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import DateRangeSelector from './date-range-selector.js'

describe('DateRangeSelector', () => {
  it('will not let the end fall before the start', () => {
    const onChange = vi.fn()
    const { container, getByLabelText } = render(
      <DateRangeSelector
        idPrefix="when"
        label="When"
        value={{ from: new Date(2026, 2, 15) }}
        onChange={onChange}
      />,
    )
    fireEvent.focus(getByLabelText('To'))
    const days = container.querySelectorAll('.uk-day')
    fireEvent.click(days[9]) // the 10th, before the start
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.click(days[19]) // the 20th
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('explains the constraint once a start is chosen', () => {
    const { getByText } = render(
      <DateRangeSelector
        idPrefix="when"
        label="When"
        value={{ from: new Date(2026, 2, 15) }}
        onChange={() => {}}
      />,
    )
    expect(getByText('Must be on or after the start date')).toBeTruthy()
  })
})
