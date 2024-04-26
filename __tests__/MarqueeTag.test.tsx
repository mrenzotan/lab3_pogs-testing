import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Pog } from '@/lib/types'
import MarqueeTag from '@/components/home/MarqueeTag'

describe('MarqueeTag', () => {
  it('renders correctly', () => {
    const pog: Pog = {
      name: 'Test Pog',
      ticker_symbol: 'TEST',
      price: 10.99,
      color: '#ff0000',
    }

    const { getByText } = render(<MarqueeTag pog={pog} />)

    expect(getByText(pog.ticker_symbol)).toBeInTheDocument()
  })

  it('has correct classes and styles', () => {
    const pog: Pog = {
      name: 'Test Pog',
      ticker_symbol: 'TEST',
      price: 10.99,
      color: '#ff0000',
    }

    const { container } = render(<MarqueeTag pog={pog} />)

    const element = container.querySelector('.flex')
    expect(element).toHaveClass('flex')
    expect(element).toHaveClass('justify-start')
    expect(element).toHaveClass('border')
    expect(element).toHaveClass('border-gray-100')
    expect(element).toHaveClass('bg-slate-50')
    expect(element).toHaveClass('rounded')
    expect(element).toHaveClass('mr-6')
  })
})
