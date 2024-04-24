'use client'

import React, { useState, useEffect } from 'react'
import { Pog } from '@/lib/types'

type TradeProps = {
  paramsID: string
}

const Trade: React.FC<TradeProps> = ({ paramsID }) => {
  const [pogs, setPogs] = useState<Pog[]>([])
  const [selectedPog, setSelectedPog] = useState<Pog | null>(null)

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

  useEffect(() => {
    const getPogByID = (id: string) => {
      return pogs.find((pog) => pog.id?.toString() === id)
    }

    const selectedPog = getPogByID(paramsID)
    if (selectedPog !== undefined) {
      setSelectedPog(selectedPog)
    } else {
      setSelectedPog(null)
    }
  }, [pogs, paramsID])

  return (
    <div>
      {selectedPog ? (
        <div>
          <h2>{selectedPog.name}</h2>
          <p>Ticker symbol: {selectedPog.ticker_symbol}</p>
          <p>Price: {selectedPog.price}</p>
          <p>Color: {selectedPog.color}</p>
        </div>
      ) : (
        <p>No Pog found with ID {paramsID}</p>
      )}
    </div>
  )
}

export default Trade
