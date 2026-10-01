import classNames from 'classnames'

export interface HelperTextProps {
  text: string
  tone?: 'neutral' | 'error'
  id?: string
}

const HelperText = ({ text, tone = 'neutral', id }: HelperTextProps) => (
  <span id={id} className={classNames('uk-helper', `uk-helper--${tone}`)}>
    {text}
  </span>
)

export default HelperText
