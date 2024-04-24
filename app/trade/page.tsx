import React from 'react'
import ShowPogs from '@/components/pog_components/ShowPogs'
import Link from 'next/link'

const Trade = () => {
  return (
    <main className="bg-gray-950 w-screen h-screen p-2">
      <Link href="/" className="text-white">
        Go to home
      </Link>
      <ShowPogs />
    </main>
  )
}

export default Trade
