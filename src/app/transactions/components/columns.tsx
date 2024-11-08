'use client'

import { type Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { TransactionBadge } from './transaction-badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: 'pending' | 'processing' | 'success' | 'failed'
//   email: string
// }

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: 'Transferência Bancária',
  BANK_SLIP: 'Boleto Bancário',
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  OTHER: 'Outros',
  PIX: 'Pix',
}

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: 'Educação',
  ENTERTAINMENT: 'Entretenimento',
  FOOD: 'Alimentação',
  HEALTH: 'Saúde',
  HOUSING: 'Moradia',
  OTHER: 'Outros',
  SALARY: 'Salário',
  TRANSPORTATION: 'Transporte',
  UTILITY: 'Utilidades',
}

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
