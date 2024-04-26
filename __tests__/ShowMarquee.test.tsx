import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import ShowMarquee from '@/components/home/ShowMarquee'
import { Pog } from '@/lib/types'

jest.mock('react-fast-marquee', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

jest.mock('../components/home/MarqueeTag', () => ({
  __esModule: true,
  default: ({ pog }: { pog: Pog }) => <div>{pog.name}</div>,
}))

jest.mock('../lib/types', () => ({
  __esModule: true,
  Pog: {
    id: '1',
    name: 'Test Pog',
    tickerSymbol: 'TPOG',
  },
}))

describe('ShowMarquee', () => {
  it('should render the Marquee component with the fetched pogs', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: '1',
            name: 'Test Pog',
            tickerSymbol: 'TPOG',
          },
        ]),
    })

    render(<ShowMarquee />)

    await waitFor(() => {
      expect(screen.getByText('Test Pog')).toBeInTheDocument()
    })
  })

  it('should handle fetch error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    console.error = jest.fn()

    render(<ShowMarquee />)

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        new Error('Failed to fetch pogs')
      )
    })
  })
})
