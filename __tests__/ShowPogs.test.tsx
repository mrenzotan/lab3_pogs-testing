import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import ShowPogs from '@/components/pog_components/ShowPogs'
import { Pog } from '@/lib/types'

jest.mock('../components/pog_components/PogCard', () => ({
  __esModule: true,
  default: ({ pog }: { pog: Pog }) => (
    <div data-testid="pog-card">{pog.name}</div>
  ),
}))

describe('ShowPogs', () => {
  it('should render the POGs fetched from the API', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: '1',
            name: 'Test Pog 1',
            ticker_symbol: 'TPOG1',
            price: 10.99,
            color: '#FFFFFF',
          },
          {
            id: '2',
            name: 'Test Pog 2',
            ticker_symbol: 'TPOG2',
            price: 15.99,
            color: '#000000',
          },
        ]),
    })

    render(<ShowPogs />)

    await waitFor(() => {
      expect(screen.getAllByTestId('pog-card')).toHaveLength(2)
      expect(screen.getByText('Test Pog 1')).toBeInTheDocument()
      expect(screen.getByText('Test Pog 2')).toBeInTheDocument()
    })
  })

  it('should handle fetch error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    console.error = jest.fn()

    render(<ShowPogs />)

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        new Error('Failed to fetch POGs')
      )
    })
  })
})
