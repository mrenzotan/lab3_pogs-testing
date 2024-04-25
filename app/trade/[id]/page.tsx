import React from 'react'
import { Pog } from '@/lib/types'
import Trade from '@/components/trade/Trade'

const SpecificPog = ({ params }: { params: { id: string } }) => {
  return (
    <main className="p-2">
      <Trade paramsID={params.id} />
    </main>
  )
}

export default SpecificPog
