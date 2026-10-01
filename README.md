# @mythos/ui-library

React components for forms and date selection.

```bash
npm install @mythos/ui-library
```

The package publishes ESM and CJS builds and one stylesheet. Import the stylesheet
once, near the root of your app:

```tsx
import '@mythos/ui-library/styles.css'
```

`react` is a peer dependency; `classnames` and `date-fns` are the only runtime
dependencies.

## Usage

```tsx
import { useState } from 'react'
import { Card, DateRangeSelector, TextField, Button } from '@mythos/ui-library'
import type { DateRange } from '@mythos/ui-library'

export const Callback = () => {
  const [name, setName] = useState('')
  const [when, setWhen] = useState<DateRange>({})

  return (
    <Card title="Book a callback">
      <TextField id="name" label="Your name" value={name} onChange={setName} required />
      <DateRangeSelector idPrefix="when" label="When suits you?" value={when} onChange={setWhen} />
      <Button label="Request" variant="primary" onClick={() => submit(name, when)} />
    </Card>
  )
}
```

## Components

| Component                  | Purpose                                                             |
| -------------------------- | ------------------------------------------------------------------- |
| `TextField`                | Single-line input with a label and optional helper text             |
| `FieldLabel`, `HelperText` | The two halves of `TextField`, exported for custom fields           |
| `Button`                   | Action button — `primary`, `secondary` (default) or `danger`        |
| `Card`                     | Padded surface with an optional heading                             |
| `Calendar`, `CalendarDay`  | Month grid; presentational, the caller owns the month               |
| `DateSelector`             | One date — a read-only `TextField` that opens a `Calendar` on focus |
| `DateRangeSelector`        | A start and an end, neither able to cross the other                 |

Every component exports its props type alongside it (`TextFieldProps`,
`DateRangeSelectorProps`, and so on), plus `DateRange`.

### TextField

| Prop                               | Type                                 | Notes                                                   |
| ---------------------------------- | ------------------------------------ | ------------------------------------------------------- |
| `id`                               | `string`                             | Required; also used to link the helper text             |
| `label`                            | `string`                             | Required                                                |
| `value` / `onChange`               | `string` / `(value: string) => void` | `onChange` receives the value, not the event            |
| `helperText`                       | `string`                             | Linked with `aria-describedby`                          |
| `invalid`                          | `boolean`                            | Sets `aria-invalid` and tints the helper text           |
| `required`, `disabled`, `readOnly` | `boolean`                            | Forwarded to the input; `required` also marks the label |
| `onFocus`                          | `() => void`                         | What `DateSelector` uses to open its calendar           |

### DateSelector and DateRangeSelector

`DateSelector` takes `min` and `max`; days outside them are ignored when picked. It
owns the month the calendar shows, so the arrows navigate. `DateRangeSelector`
wires two of them together — the end takes the start as its `min`, the start takes
the end as its `max` — and highlights the span in both calendars.

Comparisons are by calendar day, never by timestamp, so a `Date` carrying a time
still matches the cell it belongs to.

## Development

```bash
npm ci
npm run build       # rollup, then sass -> dist/styles.css
npm test            # vitest
npm run lint        # eslint + stylelint
npm run typecheck   # tsc --noEmit
npm run format      # prettier --check
```

Source conventions: one component per file, kebab-case filenames, `.js` extensions
on relative imports (TypeScript's ESM resolution), SCSS in `src/styles/` with
`uk-` prefixed class names.
