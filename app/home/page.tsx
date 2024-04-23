import React from 'react'
import ShowMarquee from '@/components/home/ShowMarquee'
import Navbar from '@/components/Navbar'
import Hero from '@/components/home/Hero'

const Home = () => {
  return (
    <main className="flex flex-col h-screen bg-gray-950 text-slate-50">
      <Navbar />
      <ShowMarquee />
      <Hero />
    </main>
  )
}

export default Home
