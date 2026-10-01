import classNames from 'classnames'

export interface CalendarDayProps {
  date: Date
  selected?: boolean
  inRange?: boolean
  onSelect: (date: Date) => void
}

const CalendarDay = ({ date, selected, inRange, onSelect }: CalendarDayProps) => (
  <button
    type="button"
    className={classNames('uk-day', {
      'uk-day--selected': selected,
      'uk-day--in-range': inRange,
    })}
    onClick={() => onSelect(date)}
  >
    {date.getDate()}
  </button>
)

export default CalendarDay
