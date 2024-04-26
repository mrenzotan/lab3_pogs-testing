import React from 'react'
import { Pog } from '@/lib/types'
import Trade from '@/components/trade/Trade'

const SpecificPog = ({ params }: { params: { id: string } }) => {
  return (
    <main className="p-2 flex justify-center items-center h-screen w-screen">
      <Trade paramsID={params.id} />
    </main>
  )
}

export default SpecificPog
