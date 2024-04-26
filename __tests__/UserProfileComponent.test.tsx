import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'
import UserProfileComponent from '@/components/user_profile/UserProfileComponent'

jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

describe('UserProfileComponent', () => {
  it('should render the user profile with the correct information', async () => {
    const user = {
      sub: '1234',
      name: 'John Doe',
      email: 'john@example.com',
      picture: 'https://example.com/profile.jpg',
    }

    const userDB: User = {
      id: 'sampeUserID',
      name: 'John Doe',
      email: 'john@example.com',
      isAdmin: false,
      balance: 100,
      ownedPogs: [1, 2, 3],
    }

    ;(useUser as jest.Mock).mockReturnValue({
      user,
      error: null,
      isLoading: false,
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(userDB),
    })

    render(<UserProfileComponent />)

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
      expect(screen.getByText('Balance: 100')).toBeInTheDocument()
      expect(screen.getByText('POG ID: 1 (Quantity: 1)')).toBeInTheDocument()
      expect(screen.getByText('POG ID: 2 (Quantity: 1)')).toBeInTheDocument()
      expect(screen.getByText('POG ID: 3 (Quantity: 1)')).toBeInTheDocument()
      expect(screen.getByTestId('image-component')).toHaveTextContent(
        'https://example.com/profile.jpg'
      )
    })
  })

  it('should handle fetch errors', async () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: null,
      error: new Error('Failed to fetch user data'),
      isLoading: false,
    })

    render(<UserProfileComponent />)

    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to fetch user data')
      ).toBeInTheDocument()
    })
  })
})
