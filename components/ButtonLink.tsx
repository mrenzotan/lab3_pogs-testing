import Link from 'next/link'
import React, { ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  children: ReactNode
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }) => {
  return (
    <Link className="py-2 px-4 rounded-sm bg-red-500" href={href}>
      {children}
    </Link>
  )
}

export default ButtonLink
