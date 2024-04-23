'use client'

import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const { user } = useUser()

  const [showDropdown, setShowDropdown] = useState(false)

  const handleImageClick = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <nav className="flex justify-between items-center w-full p-2 mb-2">
      <div className="font-bold text-lg">POGCHAMP</div>
      {user ? (
        <div className="flex flex-col justify-end items-end w-48">
          <button onClick={handleImageClick}>
            <Image
              src={user?.picture || ''}
              alt={user?.name || ''}
              width={48}
              height={48}
              className="rounded-full border border-gray-100"
            />
          </button>
          {showDropdown && (
            <div className="mt-2 w-full bg-white border border-gray-200 rounded shadow-lg">
              <Link
                href="/api/auth/logout"
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </nav>
  )
}

export default Navbar
