import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Pog } from '@/lib/types'
import PogCard from '@/components/pog_components/PogCard'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <a href={href} data-testid="link-component">
      {children}
    </a>
  ),
}))

describe('PogCard', () => {
  it('should render the PogCard component with the correct content', () => {
    const pog: Pog = {
      id: 1,
      name: 'Test Pog',
      ticker_symbol: 'TPOG',
      price: 10.99,
      color: '#FFFFFF',
    }

    const { container } = render(<PogCard pog={pog} />)
    const pogCardElement = container.firstChild as HTMLElement

    expect(screen.getByText('Test Pog')).toBeInTheDocument()
    expect(screen.getByText('TPOG')).toBeInTheDocument()
    expect(screen.getByText('Price: ₱10.99')).toBeInTheDocument()
    expect(screen.getByTestId('link-component')).toHaveAttribute(
      'href',
      '/trade/1'
    )
    expect(screen.getByTestId('link-component')).toHaveTextContent('View More')

    const colorElement = pogCardElement.querySelector('.w-10.h-10.rounded-full')
    expect(colorElement).not.toBeNull()
    expect(getComputedStyle(colorElement!).backgroundColor).toBe(
      'rgb(255, 255, 255)'
    )
  })
})
