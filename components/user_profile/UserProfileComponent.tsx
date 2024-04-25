'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'
import { Yatra_One } from 'next/font/google'

const UserProfileComponent = () => {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userDB, setUserDB] = useState<User>()

  useEffect(() => {
    if (!isLoading && !user && !error) {
      router.push('/api/auth/login')
    } else {
      setLoading(false)
    }
  }, [isLoading, user, error, router])

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await fetch('/api/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: user?.sub }),
          })
          if (!response.ok) {
            throw new Error('Failed to fetch user data')
          }
          const userData = await response.json()
          setUserDB(userData)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchData()
  }, [user])

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
      <div>{userDB?.name}</div>
      <div>{userDB?.email}</div>
      <div>{userDB?.balance}</div>
      <div>{userDB?.ownedPogs}</div>
    </div>
  )
}

export default UserProfileComponent
