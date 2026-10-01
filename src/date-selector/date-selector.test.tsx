import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import DateSelector from './date-selector.js'

describe('DateSelector', () => {
  it('is read-only and opens its calendar on focus', () => {
    const { container, getByLabelText } = render(
      <DateSelector id="d" label="From" onChange={() => {}} />,
    )
    const input = getByLabelText('From') as HTMLInputElement
    expect(input.readOnly).toBe(true)
    expect(container.querySelector('.uk-calendar')).toBe(null)
    fireEvent.focus(input)
    expect(container.querySelector('.uk-calendar')).toBeTruthy()
  })

  it('ignores a day earlier than min', () => {
    const onChange = vi.fn()
    const { container, getByLabelText } = render(
      <DateSelector id="d" label="To" min={new Date(2026, 2, 15)} onChange={onChange} />,
    )
    fireEvent.focus(getByLabelText('To'))
    const cells = container.querySelectorAll('.uk-day')
    fireEvent.click(cells[9]) // the 10th
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.click(cells[19]) // the 20th
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
