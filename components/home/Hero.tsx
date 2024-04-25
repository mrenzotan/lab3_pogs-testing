'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'
import ButtonLink from '../ButtonLink'

const Hero = () => {
  const { user } = useUser()

  const isLoggedIn = user !== undefined && user !== null

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.sub,
              userName: user.name,
              userEmail: user.email,
            }),
          })

          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`)
          }

          try {
            const data = await response.json()
            console.log(data)
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }
    fetchData()
  }, [isLoggedIn, user])

  return (
    <div className="p-2 flex flex-col sm:flex-row justify-start items-center w-full h-full">
      <Image
        src="/hero/pogs-hero.jpg"
        alt="Hero Image"
        width={1600}
        height={900}
        className="rounded-md w-full sm:w-1/2"
      />
      <div className="flex flex-col items-start justify-center w-full sm:w-1/2 ml-4 gap-4">
        <h1 className="font-bold text-4xl">You&apos;re the champ, pogchamp!</h1>
        <p>Join the Craze - Buy, Sell, and Trade? Pogs </p>
        <div className="w-full sm:w-1/2 flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <ButtonLink href="/trade">Buy</ButtonLink>
              <ButtonLink href="/trade">Sell</ButtonLink>
            </>
          ) : (
            <ButtonLink href="/api/auth/login">Login to start</ButtonLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
