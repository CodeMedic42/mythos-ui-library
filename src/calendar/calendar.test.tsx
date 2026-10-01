import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Calendar from './calendar.js'

const march = new Date(2026, 2, 1) // 1 Mar 2026 falls on a Sunday, so no padding

describe('Calendar', () => {
  it('renders one cell per day of the month', () => {
    const { container } = render(<Calendar month={march} onSelect={() => {}} />)
    expect(container.querySelectorAll('.uk-day')).toHaveLength(31)
  })

  it('pads so the first of the month sits under its weekday', () => {
    const april = new Date(2026, 3, 1) // 1 Apr 2026 is a Wednesday
    const { container } = render(<Calendar month={april} onSelect={() => {}} />)
    expect(container.querySelectorAll('.uk-calendar__blank')).toHaveLength(3)
    expect(container.querySelectorAll('.uk-calendar__weekday')).toHaveLength(7)
  })

  it('selects by calendar day, not by timestamp', () => {
    const { container } = render(
      <Calendar month={march} selected={new Date(2026, 2, 14, 13, 45)} onSelect={() => {}} />,
    )
    const selected = container.querySelectorAll('.uk-day--selected')
    expect(selected).toHaveLength(1)
    expect(selected[0].textContent).toBe('14')
  })

  it('highlights an inclusive span', () => {
    const { container } = render(
      <Calendar
        month={march}
        rangeStart={new Date(2026, 2, 10, 9, 0)}
        rangeEnd={new Date(2026, 2, 12)}
        onSelect={() => {}}
      />,
    )
    expect(container.querySelectorAll('.uk-day--in-range')).toHaveLength(3)
  })

  it('highlights nothing when the range ends before it starts', () => {
    const { container } = render(
      <Calendar
        month={march}
        rangeStart={new Date(2026, 2, 20)}
        rangeEnd={new Date(2026, 2, 10)}
        onSelect={() => {}}
      />,
    )
    expect(container.querySelectorAll('.uk-day--in-range')).toHaveLength(0)
  })

  it('offers navigation only when the caller can accept it', () => {
    const onMonthChange = vi.fn()
    const fixed = render(<Calendar month={march} onSelect={() => {}} />)
    expect(fixed.container.querySelectorAll('.uk-calendar__nav')).toHaveLength(0)

    const { getByLabelText } = render(
      <Calendar month={march} onSelect={() => {}} onMonthChange={onMonthChange} />,
    )
    fireEvent.click(getByLabelText('Next month'))
    expect(onMonthChange.mock.calls[0][0].getMonth()).toBe(3)
    fireEvent.click(getByLabelText('Previous month'))
    expect(onMonthChange.mock.calls[1][0].getMonth()).toBe(1)
  })
})
