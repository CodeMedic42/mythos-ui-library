import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import TextField from './text-field.js'

describe('TextField', () => {
  it('renders its label', () => {
    const { getByText } = render(
      <TextField id="a" label="Full name" value="" onChange={() => {}} />,
    )
    expect(getByText('Full name')).toBeTruthy()
  })

  it('links helper text to the input with aria-describedby', () => {
    const { getByLabelText, getByText } = render(
      <TextField id="a" label="Email" value="" onChange={() => {}} helperText="Work address" />,
    )
    expect(getByLabelText('Email').getAttribute('aria-describedby')).toBe('a-helper')
    expect(getByText('Work address').id).toBe('a-helper')
  })

  it('marks itself invalid only when asked', () => {
    const { getByLabelText, rerender } = render(
      <TextField id="a" label="Email" value="" onChange={() => {}} />,
    )
    expect(getByLabelText('Email').getAttribute('aria-invalid')).toBe(null)
    rerender(<TextField id="a" label="Email" value="" onChange={() => {}} invalid />)
    expect(getByLabelText('Email').getAttribute('aria-invalid')).toBe('true')
  })

  it('reports what was typed', () => {
    const onChange = vi.fn()
    const { getByLabelText } = render(
      <TextField id="a" label="Email" value="" onChange={onChange} />,
    )
    fireEvent.change(getByLabelText('Email'), { target: { value: 'a@b.c' } })
    expect(onChange).toHaveBeenCalledWith('a@b.c')
  })
})
