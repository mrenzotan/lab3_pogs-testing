'use client'

import React from 'react'
import MarqueeTag from './MarqueeTag'
import Marquee from 'react-fast-marquee'

const ShowMarquee = () => {
  return (
    <Marquee pauseOnHover autoFill className="h-8">
      <MarqueeTag />
    </Marquee>
  )
}

export default ShowMarquee
