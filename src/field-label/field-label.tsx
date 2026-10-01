import type { ReactNode } from 'react'
import classNames from 'classnames'

export interface FieldLabelProps {
  htmlFor: string
  required?: boolean
  children: ReactNode
}

const FieldLabel = ({ htmlFor, required, children }: FieldLabelProps) => (
  <label className={classNames('uk-label', { 'uk-label--required': required })} htmlFor={htmlFor}>
    {children}
  </label>
)

export default FieldLabel
