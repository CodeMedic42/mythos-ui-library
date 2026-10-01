import { memo } from 'react'
import FieldLabel from '../field-label/field-label.js'
import HelperText from '../helper-text/helper-text.js'

export interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  helperText?: string
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

/**
 * Single-line text input. The base input primitive — DateSelector wraps it rather
 * than reimplementing label and helper-text handling.
 *
 * When `helperText` is given it is linked to the input with `aria-describedby`, so
 * a screen reader announces it with the field rather than separately.
 */
const TextField = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  helperText,
  invalid,
  disabled,
  readOnly,
  required,
}: TextFieldProps) => {
  const helperId = `${id}-helper`
  return (
    <div className="uk-field">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        className="uk-field__input"
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={helperText ? helperId : undefined}
        onFocus={onFocus}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText ? (
        <HelperText id={helperId} text={helperText} tone={invalid ? 'error' : 'neutral'} />
      ) : null}
    </div>
  )
}

export default memo(TextField)
