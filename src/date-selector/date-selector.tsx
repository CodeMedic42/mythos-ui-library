import { useCallback, useState } from 'react'
import { format, isAfter, isBefore, startOfDay } from 'date-fns'
import TextField from '../text-field/text-field.js'
import Calendar from '../calendar/calendar.js'

export interface DateSelectorProps {
  id: string
  label: string
  value?: Date
  onChange: (date: Date) => void
  helperText?: string
  /** Earliest selectable date. Days before it are ignored when picked. */
  min?: Date
  /** Latest selectable date. Days after it are ignored when picked. */
  max?: Date
  /** Start of the span to highlight in the open calendar. */
  rangeStart?: Date
  /** End of the span to highlight in the open calendar. */
  rangeEnd?: Date
}

/** Pick a single date. A read-only TextField that opens a Calendar on focus. */
const DateSelector = ({
  id,
  label,
  value,
  onChange,
  helperText,
  min,
  max,
  rangeStart,
  rangeEnd,
}: DateSelectorProps) => {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => value ?? min ?? new Date())

  // Stable, so memoising TextField is worth something rather than defeated on every
  // render by fresh closures.
  const openCalendar = useCallback(() => setOpen(true), [])
  const ignoreTyping = useCallback(() => {}, [])

  const select = (date: Date) => {
    const day = startOfDay(date)
    if (min && isBefore(day, startOfDay(min))) return
    if (max && isAfter(day, startOfDay(max))) return
    onChange(date)
    setOpen(false)
  }

  return (
    <div className="uk-date-selector">
      <TextField
        id={id}
        label={label}
        value={value ? format(value, 'yyyy-MM-dd') : ''}
        readOnly
        onFocus={openCalendar}
        onChange={ignoreTyping}
        helperText={helperText}
      />
      {open ? (
        <Calendar
          month={month}
          onMonthChange={setMonth}
          selected={value}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onSelect={select}
        />
      ) : null}
    </div>
  )
}

export default DateSelector
