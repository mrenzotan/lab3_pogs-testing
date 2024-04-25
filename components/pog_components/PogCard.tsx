import React from 'react'
import { Pog } from '@/lib/types'
import Link from 'next/link'

type PogCardProps = {
  pog: Pog
}

const PogCard: React.FC<PogCardProps> = ({ pog }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 m-4 flex flex-col items-center"
      key={pog.id}
    >
      <h2 className="text-xl font-bold">{pog.name}</h2>
      <p>{pog.ticker_symbol}</p>
      <p>Price: ₱{pog.price!.toFixed(2)}</p>
      <div
        className="w-10 h-10 rounded-full"
        style={{ backgroundColor: pog.color }}
      ></div>
      <Link href={`/trade/${pog.id}`}>View More</Link>
    </div>
  )
}
export default PogCard
