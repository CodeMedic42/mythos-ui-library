import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Card from './card.js'

describe('Card', () => {
  it('renders a heading only when given a title', () => {
    const { container, rerender } = render(<Card>body</Card>)
    expect(container.querySelector('.uk-card__title')).toBe(null)
    rerender(<Card title="Details">body</Card>)
    expect(container.querySelector('.uk-card__title')?.textContent).toBe('Details')
  })
})
