'use client'

import React, { useState, useEffect } from 'react'
import MarqueeTag from './MarqueeTag'
import Marquee from 'react-fast-marquee'
import { Pog } from '@/lib/types'

const ShowMarquee: React.FC = () => {
  const [pogs, setPogs] = useState<Pog[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/pogs')
        if (!res.ok) {
          throw new Error('Failed to fetch pogs')
        }
        const data = await res.json()
        setPogs(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  if (!pogs) return null

  return (
    <Marquee pauseOnHover autoFill className="h-8">
      {pogs.map((pog) => (
        <MarqueeTag key={pog.id} pog={pog} />
      ))}
    </Marquee>
  )
}

export default ShowMarquee
