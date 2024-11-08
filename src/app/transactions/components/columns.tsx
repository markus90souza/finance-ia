'use client'

import { type Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { TransactionBadge } from './transaction-badge'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: 'pending' | 'processing' | 'success' | 'failed'
//   email: string
// }

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell({
      row: {
        original: { type },
      },
    }) {
      return <TransactionBadge type={type} />
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'payment_method',
    header: 'Metodo de pagamento',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'value',
    header: 'Valor',
  },
  {
    accessorKey: 'actions',
  },
]
