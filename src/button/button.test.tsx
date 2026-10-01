import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Button from './button.js'

describe('Button', () => {
  it('is secondary unless told otherwise', () => {
    const { getByRole } = render(<Button label="Save" onClick={() => {}} />)
    expect(getByRole('button').className).toContain('uk-button--secondary')
  })

  it('never submits a surrounding form by accident', () => {
    const { getByRole } = render(<Button label="Save" onClick={() => {}} />)
    expect(getByRole('button').getAttribute('type')).toBe('button')
  })

  it('reports clicks', () => {
    const onClick = vi.fn()
    const { getByRole } = render(<Button label="Save" onClick={onClick} variant="danger" />)
    fireEvent.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(getByRole('button').className).toContain('uk-button--danger')
  })
})
