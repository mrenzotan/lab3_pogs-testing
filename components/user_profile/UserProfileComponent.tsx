'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'

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

  const countPogs = () => {
    const pogCounts: { [key: number]: number } = {}
    userDB?.ownedPogs.forEach((pog) => {
      pogCounts[pog] = (pogCounts[pog] || 0) + 1
    })
    return pogCounts
  }

  const pogCounts = countPogs()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex flex-col items-center justify-center p-2">
        <div className="md:flex-shrink-0">
          <Image
            src={user?.picture || ''}
            alt={user?.name || ''}
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <div className="p-8 flex flex-col items-center">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {userDB?.name}
          </div>
          <div className="mt-2 text-gray-600">{userDB?.email}</div>
          <div className="mt-2 text-gray-600">Balance: {userDB?.balance}</div>
          <div className="mt-2 text-gray-600">Owned Pogs:</div>
          <div className="mt-2 text-gray-600">
            {Object.entries(pogCounts).map(([pog, count]) => (
              <div key={pog}>
                POG ID: {pog} (Quantity: {count})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileComponent
