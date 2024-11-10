'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const DashboardHeader = () => {
  const pathname = usePathname()
  return (
    <header className="flex items-center justify-between border-b px-4 py-8">
      <nav className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={173} height={39} />

        <Link
          className={
            pathname === '/dashboard'
              ? 'font-bold text-primary'
              : 'text-muted-foreground'
          }
          href={'/dashboard'}
        >
          Dashboard
        </Link>
        <Link
          className={
            pathname === '/transactions'
              ? 'font-bold text-primary'
              : 'text-muted-foreground'
          }
          href={'/transactions'}
        >
          Transações
        </Link>
        <Link
          className={
            pathname === '/subscriptions'
              ? 'font-bold text-primary'
              : 'text-muted-foreground'
          }
          href={'/subscriptions'}
        >
          Inscrições
        </Link>
      </nav>

      <UserButton showName signInUrl="/login" />
    </header>
  )
}
