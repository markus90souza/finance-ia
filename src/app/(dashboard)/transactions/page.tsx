import { db } from '@/lib/prisma'

import { DataTable } from './components/data-table'
import { transactionsColumns } from './components/columns'
import { TransactionButton } from '@/components/shared/transaction-button'
import { auth } from '@clerk/nextjs/server'

const TransactionsPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  })
  return (
    <div className="space-y-6 p-6">
      <header className="flex w-full items-center justify-between">
        <strong className="text-2xl font-bold">Transações</strong>
        <TransactionButton />
      </header>

      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  )
}

export default TransactionsPage
