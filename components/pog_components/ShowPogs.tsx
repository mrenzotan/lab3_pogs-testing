'use client'

import React, { useState, useEffect } from 'react'
import { Pog } from '@/lib/types'
import PogCard from './PogCard'

const ShowPogs: React.FC = () => {
  const [pogs, setPogs] = useState<Pog[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pogs')
        if (!response.ok) {
          throw new Error('Failed to fetch POGs')
        }
        const data = await response.json()
        setPogs(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* {pogs.map((pog) => (
        <PogCard key={pog.id} pog={pog} />
      ))} */}
      <PogCard />
      <PogCard />
      <PogCard />
      <PogCard />
      <PogCard />
    </div>
  )
}

export default ShowPogs
