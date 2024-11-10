import { DashboardHeader } from '@/components/dashboard-header'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { FC, ReactNode } from 'react'

type RootLayoutProps = {
  children: ReactNode
}

const DashboardLayout: FC<RootLayoutProps> = async ({ children }) => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }
  return (
    <main>
      <DashboardHeader />
      {children}
    </main>
  )
}

export default DashboardLayout
