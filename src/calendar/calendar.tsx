import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import CalendarDay from './calendar-day.js'

export interface CalendarProps {
  month: Date
  selected?: Date
  rangeStart?: Date
  rangeEnd?: Date
  onSelect: (date: Date) => void
  /** Omit to render a fixed month with no navigation. */
  onMonthChange?: (month: Date) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

/**
 * Month grid. Purely presentational — it holds no selection state of its own, and
 * the month it shows is the caller's to own.
 *
 * Every comparison is by calendar day rather than by timestamp, so a date carrying
 * a time of day still matches the cell it belongs to. A range whose end falls
 * before its start highlights nothing instead of throwing.
 */
const Calendar = ({
  month,
  selected,
  rangeStart,
  rangeEnd,
  onSelect,
  onMonthChange,
}: CalendarProps) => {
  const first = startOfMonth(month)
  const days = eachDayOfInterval({ start: first, end: endOfMonth(month) })
  const range =
    rangeStart && rangeEnd && startOfDay(rangeStart) <= startOfDay(rangeEnd)
      ? { start: startOfDay(rangeStart), end: endOfDay(rangeEnd) }
      : undefined

  return (
    <div className="uk-calendar">
      <div className="uk-calendar__header">
        {onMonthChange ? (
          <button
            type="button"
            className="uk-calendar__nav"
            aria-label="Previous month"
            onClick={() => onMonthChange(subMonths(first, 1))}
          >
            ‹
          </button>
        ) : null}
        <span className="uk-calendar__month">{format(month, 'MMMM yyyy')}</span>
        {onMonthChange ? (
          <button
            type="button"
            className="uk-calendar__nav"
            aria-label="Next month"
            onClick={() => onMonthChange(addMonths(first, 1))}
          >
            ›
          </button>
        ) : null}
      </div>

      <div className="uk-calendar__grid">
        {WEEKDAYS.map((day) => (
          <span key={day} className="uk-calendar__weekday">
            {day}
          </span>
        ))}
        {/* The 1st rarely falls on a Sunday; pad so every date sits under its weekday. */}
        {Array.from({ length: getDay(first) }, (_, i) => (
          <span key={`blank-${i}`} className="uk-calendar__blank" />
        ))}
        {days.map((day) => (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            selected={Boolean(selected && isSameDay(selected, day))}
            inRange={Boolean(range && isWithinInterval(day, range))}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default Calendar
