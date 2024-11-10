import { type FC } from 'react'
import { SummaryCards } from './components/summary-cards'
import { ExpensesPerCategory } from './components/expenses-per-category'
import { LastTransactions } from './components/last-trasactions'
import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import { TimeSelect } from './components/time-select'
import { TransactionsPieChart } from './components/transaction-pie-chart'
import { getDashboard } from '@/data/get-dashboard'

interface DashboardProps {
  searchParams: {
    month: string
  }
}

const DashboardPage: FC<DashboardProps> = async ({
  searchParams: { month },
}) => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }
  const monthIsInvalid = !month || !isMatch(month, 'MM')
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }
  const dashboard = await getDashboard(month)
  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards month={month} {...dashboard} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
        <LastTransactions lastTransactions={dashboard.lastTransactions} />
      </div>
    </div>
  )
}

export default DashboardPage
