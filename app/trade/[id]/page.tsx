import React from 'react'
import { Pog } from '@/lib/types'

const SpecificPog = ({ params }: { params: { id: string } }) => {
  return <div>SpecificPog {params.id}</div>
}

export const generateStaticParams = async () => {
  const pogs = await fetch('/api/pogs').then((res) => res.json())
  return pogs.map((pog: Pog) => ({
    id: pog.id?.toString(),
  }))
}

export default SpecificPog
