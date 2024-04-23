import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="p-2 flex flex-col sm:flex-row justify-start items-center w-full h-full">
      <Image
        src="/hero/pogs-hero.jpg"
        alt="Hero Image"
        width={1600}
        height={900}
        className="rounded-md w-full sm:w-1/2"
      />
      <div className="w-full sm:w-1/2 flex justify-center items-center gap-2">
        <Link href="/">Buy</Link>
        <Link href="/">Sell</Link>
      </div>
    </div>
  )
}

export default Hero
