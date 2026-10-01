import type { ReactNode } from 'react'

export interface CardProps {
  title?: string
  children: ReactNode
}

/** Padded surface that groups related content. Renders a heading when `title` is given. */
const Card = ({ title, children }: CardProps) => (
  <section className="uk-card">
    {title ? <h2 className="uk-card__title">{title}</h2> : null}
    <div className="uk-card__body">{children}</div>
  </section>
)

export default Card
