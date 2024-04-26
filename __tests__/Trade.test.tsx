import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Pog, User } from '@/lib/types'
import Trade from '@/components/trade/Trade'

jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}))

describe('Trade', () => {
  it('should render the Trade component with the selected Pog', async () => {
    const pogs: Pog[] = [
      {
        id: 1,
        name: 'Test Pog',
        ticker_symbol: 'TPOG',
        price: 10.99,
        color: '#FFFFFF',
      },
    ]

    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(pogs),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            balance: 100,
            ownedPogs: ['1'],
          }),
      })

    render(<Trade paramsID="1" />)

    await waitFor(() => {
      expect(screen.getByText('Test Pog')).toBeInTheDocument()
      expect(screen.getByText('TPOG')).toBeInTheDocument()
      expect(screen.getByText('10.99')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Buy' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Sell' })).toBeInTheDocument()
    })
  })

  it('should handle fetch errors', async () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

    console.error = jest.fn()

    render(<Trade paramsID="1" />)

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(2)
      expect(console.error).toHaveBeenCalledWith(expect.any(Error))
      expect(console.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Error)
      )
    })
  })

  it('should handle buying a Pog', async () => {
    const pogs: Pog[] = [
      {
        id: 1,
        name: 'Test Pog',
        ticker_symbol: 'TPOG',
        price: 10.99,
        color: '#FFFFFF',
      },
    ]

    const user: User = {
      id: 'sampeUserID',
      name: 'John Dy',
      email: 'johndy@gmail.com',
      isAdmin: false,
      balance: 100,
      ownedPogs: [],
    }

    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(pogs),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(user),
      })
      .mockResolvedValueOnce({
        ok: true,
      })

    render(<Trade paramsID="1" />)

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/buy', {
      body: JSON.stringify({
        pogID: 1,
        newBalance: 89.01,
        user: '1234',
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })

  it('should handle selling a Pog', async () => {
    const pogs: Pog[] = [
      {
        id: 1,
        name: 'Test Pog',
        ticker_symbol: 'TPOG',
        price: 10.99,
        color: '#FFFFFF',
      },
    ]

    const user: User = {
      id: 'sampeUserID',
      name: 'John Dy',
      email: 'johndy@gmail.com',
      isAdmin: false,
      balance: 100,
      ownedPogs: [1],
    }

    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(pogs),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(user),
      })
      .mockResolvedValueOnce({
        ok: true,
      })

    render(<Trade paramsID="1" />)

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Sell' }))
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/sell', {
      body: JSON.stringify({
        pogID: 1,
        newBalance: 110.99,
        user: '1234',
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })
})
