import React from 'react'
import { Pog } from '@/lib/types'

type MarqueeTagProps = {
  pog: Pog
}

const MarqueeTag: React.FC<MarqueeTagProps> = ({ pog }) => {
  return (
    <div className="flex justify-start border border-gray-100 bg-slate-50 rounded mr-6">
      <span className="px-1 bg-red-700 rounded-tl rounded-bl"></span>
      <p className="px-2 text-sm text-gray-950 font-medium">
        {pog.ticker_symbol}
      </p>
    </div>
  )
}

export default MarqueeTag
