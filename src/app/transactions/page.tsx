import { Button } from '@/components/ui/button'
import { db } from '@/lib/prisma'
import { ArrowDownUp } from 'lucide-react'
import { DataTable } from './components/data-table'
import { transactionsColumns } from './components/columns'

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany()
  return (
    <div className="space-y-6 p-6">
      <header className="flex w-full items-center justify-between">
        <strong className="text-2xl font-bold">Transações</strong>
        <Button className="gap-2">
          Adicionar transação
          <ArrowDownUp />
        </Button>
      </header>

      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  )
}

export default TransactionsPage
