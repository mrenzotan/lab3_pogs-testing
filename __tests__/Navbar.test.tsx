import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Navbar from '@/components/Navbar'

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

describe('Navbar', () => {
  it('should render the Navbar component for a logged-in user', () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
        picture: 'https://example.com/profile.jpg',
      },
    })

    render(<Navbar />)

    expect(screen.getByText('POGCHAMP')).toBeInTheDocument()
    expect(screen.getByTestId('image-component')).toHaveTextContent(
      'https://example.com/profile.jpg'
    )

    waitFor(() => {
      expect(screen.getByTestId('link-component')).toHaveAttribute(
        'href',
        '/user_profile'
      )
      expect(screen.getByTestId('link-component')).toHaveTextContent(
        'Your profile'
      )
      expect(screen.getByTestId('link-component')).toHaveAttribute(
        'href',
        '/api/auth/logout'
      )
      expect(screen.getByTestId('link-component')).toHaveTextContent('Logout')
    })
  })

  it('should render the Navbar component for a logged-out user', () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: null,
    })

    render(<Navbar />)

    expect(screen.getByText('POGCHAMP')).toBeInTheDocument()
    expect(screen.getByTestId('link-component')).toHaveAttribute(
      'href',
      '/api/auth/login'
    )
    expect(screen.getByTestId('link-component')).toHaveTextContent('Login')
  })

  it('should toggle the dropdown menu when the user image is clicked', async () => {
    ;(useUser as jest.Mock).mockReturnValue({
      user: {
        sub: '1234',
        name: 'John Doe',
        email: 'john@example.com',
        picture: 'https://example.com/profile.jpg',
      },
    })

    render(<Navbar />)

    const imageComponent = screen.getByTestId('image-component')
    fireEvent.click(imageComponent)

    await waitFor(() => {
      const linkComponents = screen.getAllByTestId('link-component')
      expect(linkComponents).toHaveLength(2)

      expect(linkComponents[0]).toHaveAttribute('href', '/user_profile')
      expect(linkComponents[0]).toHaveTextContent('Your profile')

      expect(linkComponents[1]).toHaveAttribute('href', '/api/auth/logout')
      expect(linkComponents[1]).toHaveTextContent('Logout')
    })
  })
})
