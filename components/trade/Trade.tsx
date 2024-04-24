'use client'

import React, { useState, useEffect } from 'react'
import { Pog } from '@/lib/types'

type TradeProps = {
  paramsID: string
}

const Trade: React.FC<TradeProps> = ({ paramsID }) => {
  const [pogs, setPogs] = useState<Pog[]>([])
  const [selectedPog, setSelectedPog] = useState<Pog | null>(null)
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)

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

  const handleBuy = async () => {
    if (amount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      const response = await fetch('/api/user/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pogId: selectedPog?.id, amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to buy Pog')
      }

      const data = await response.json()
      setBalance(data.balance)
      setAmount(0)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSell = async () => {
    if (amount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      const response = await fetch('/api/user/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pogId: selectedPog?.id, amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to sell Pog')
      }

      const data = await response.json()
      setBalance(data.balance)
      setAmount(0)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {selectedPog ? (
        <div>
          <h2>{selectedPog.name}</h2>
          <p>Ticker symbol: {selectedPog.ticker_symbol}</p>
          <p>Price: {selectedPog.price}</p>
          <p>Color: {selectedPog.color}</p>
          <p>Balance: {balance}</p>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />

          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleSell}>Sell</button>
        </div>
      ) : (
        <p>No Pog found with ID {paramsID}</p>
      )}
    </div>
  )
}

export default Trade
