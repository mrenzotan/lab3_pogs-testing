import React from 'react'
import UserProfileComponent from '@/components/user_profile/UserProfileComponent'
import Link from 'next/link'

const UserProfile = () => {
  return (
    <main className="p-2 w-screen h-screen flex flex-col gap-2">
      <Link href="/">Go to home</Link>
      <UserProfileComponent />
    </main>
  )
}

export default UserProfile
