'use client'

import { type Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { TransactionBadge } from './transaction-badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/constants'
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
    cell({
      row: {
        original: { category },
      },
    }) {
      return TRANSACTION_CATEGORY_LABELS[category]
    },
  },
  {
    accessorKey: 'payment_method',
    header: 'Metodo de pagamento',
    cell({
      row: {
        original: { paymentMethod },
      },
    }) {
      return TRANSACTION_PAYMENT_METHOD_LABELS[paymentMethod]
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell({
      row: {
        original: { date },
      },
    }) {
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    },
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell({
      row: {
        original: { amount },
      },
    }) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(amount))
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell() {
      return (
        <div className="space-x-1">
          <Button
            variant="ghost"
            size={'icon'}
            className="text-muted-foreground"
          >
            <Pencil />
          </Button>

          <Button
            variant="ghost"
            size={'icon'}
            className="text-muted-foreground"
          >
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
