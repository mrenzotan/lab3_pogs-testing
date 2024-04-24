import React from 'react'
import { Pog } from '@/lib/types'
import Link from 'next/link'

type PogCardProps = {
  pog: Pog
}

// const PogCard: React.FC<PogCardProps> = ({ pog }) => {
//   return (
//     // <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//     //   <h2 className="text-xl font-bold mb-2">{pog.name}</h2>
//     //   <p className="text-gray-600">Ticker Symbol: {pog.ticker_symbol}</p>
//     //   <p className="text-gray-600">Price: ${pog.price}</p>
//     //   <p className="text-gray-600">Color: {pog.color}</p>
//     //   <Link href={`/trade/${pog.id}`}></Link>
//     // </div>
//     <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//       <h2 className="text-xl font-bold mb-2"></h2>
//       <p className="text-gray-600">Ticker Symbol:</p>
//       <p className="text-gray-600">Price: $</p>
//       <p className="text-gray-600">Color:</p>
//     </div>
//   )
// }

const PogCard = () => {
  return (
    // <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    //   <h2 className="text-xl font-bold mb-2">{pog.name}</h2>
    //   <p className="text-gray-600">Ticker Symbol: {pog.ticker_symbol}</p>
    //   <p className="text-gray-600">Price: ${pog.price}</p>
    //   <p className="text-gray-600">Color: {pog.color}</p>
    // </div>
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">POGGER</h2>
      <p className="text-gray-600">Ticker Symbol:</p>
      <p className="text-gray-600">Price: $</p>
      <p className="text-gray-600">Color:</p>
      <Link href="/trade/id">View More</Link>
    </div>
  )
}
export default PogCard
