'use client'

import React, { useState, useEffect } from 'react'
import { Pog, User } from '@/lib/types'
import { useUser } from '@auth0/nextjs-auth0/client'

type TradeProps = {
  paramsID: string
}

const Trade: React.FC<TradeProps> = ({ paramsID }) => {
  const [pogs, setPogs] = useState<Pog[]>([])
  const [selectedPog, setSelectedPog] = useState<Pog | null>(null)
  const [amount, setAmount] = useState(0)
  const [userDB, setUserDB] = useState<User>()

  const { user } = useUser()

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

  const handleBuy = async () => {
    if (amount <= 0 || !selectedPog?.id || !user?.sub) {
      alert('Please enter a valid amount')
      return
    }

    if (userDB) {
      const newBalance = userDB?.balance - amount

      try {
        const requestBody = {
          pogID: selectedPog.id,
          newBalance: newBalance,
          user: user.sub,
        }

        const response = await fetch('/api/buy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          throw new Error('Failed to buy Pog')
        }
        setAmount(0)
      } catch (error) {
        console.error('Error buying Pog:', error)
      }
    }
  }

  const handleSell = async () => {
    if (!selectedPog?.id || !user?.sub) {
      throw new Error('Unauthorized Access')
    }

    if (userDB && selectedPog.price) {
      const newBalance = userDB.balance + selectedPog.price

      try {
        const requestBody = {
          pogID: selectedPog.id,
          newBalance: newBalance,
          user: user.sub,
        }

        const response = await fetch('/api/sell', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          throw new Error('Failed to buy Pog')
        }
        setAmount(0)
      } catch (error) {
        console.error('Error buying Pog:', error)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col justify-center items-center">
        {selectedPog ? (
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-bold">{selectedPog.name}</h2>
            <p>
              <span className="font-semibold">Ticker symbol:</span>{' '}
              {selectedPog.ticker_symbol}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {selectedPog.price}
            </p>
            <p>
              <span className="font-semibold">Color:</span> {selectedPog.color}
            </p>

            <input
              type="number"
              className="border border-gray-300 rounded px-3 py-2"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />

            <div className="flex justify-center gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleBuy}
              >
                Buy
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSell}
              >
                Sell
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No Pog found with ID {paramsID}</p>
        )}
      </div>
    </div>
  )
}

export default Trade
