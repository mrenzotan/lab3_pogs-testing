'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const UserProfileComponent = () => {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user && !error) {
      router.push('/api/auth/login')
    } else {
      setLoading(false)
    }
  }, [isLoading, user, error, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        src={user?.picture || ''}
        alt={user?.name || ''}
        width={96}
        height={96}
        className="rounded-full object-cover"
      />
      <div>{user?.name}</div>
      {/* Display e-wallet amount */}
      <div>Money:</div>
    </div>
  )
}

export default UserProfileComponent
