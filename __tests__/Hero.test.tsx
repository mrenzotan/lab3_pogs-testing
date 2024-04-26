import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Hero from '@/components/home/Hero'

jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string
    alt: string
    width: number
    height: number
  }) => <div data-testid="image-component">{src}</div>,
}))

jest.mock('../components/ButtonLink', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <a href={href} data-testid="button-link">
      {children}
    </a>
  ),
}))

describe('Hero', () => {
  it('should render the Hero component with the correct content for a logged-in user', async () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'User created' }),
    })

    render(<Hero />)

    await waitFor(() => {
      expect(
        screen.getByText("You're the champ, pogchamp!")
      ).toBeInTheDocument()
      expect(
        screen.getByText('Join the Craze - Buy, Sell, and Trade? Pogs')
      ).toBeInTheDocument()
      expect(screen.getByTestId('button-link')).toHaveAttribute(
        'href',
        '/trade'
      )
      expect(screen.getByTestId('image-component')).toHaveTextContent(
        '/hero/pogs-hero.jpg'
      )
    })
  })

  it('should render the Hero component with the correct content for a logged-out user', () => {
    ;(useUser as jest.Mock).mockReturnValue({ user: null })

    render(<Hero />)

    expect(screen.getByText("You're the champ, pogchamp!")).toBeInTheDocument()
    expect(
      screen.getByText('Join the Craze - Buy, Sell, and Trade? Pogs')
    ).toBeInTheDocument()
    expect(screen.getByTestId('button-link')).toHaveAttribute(
      'href',
      '/api/auth/login'
    )
    expect(screen.getByTestId('image-component')).toHaveTextContent(
      '/hero/pogs-hero.jpg'
    )
  })

  it('should handle fetch error', async () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    console.error = jest.fn()

    render(<Hero />)

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching data:',
        new Error('HTTP error status: 500')
      )
    })
  })
})
