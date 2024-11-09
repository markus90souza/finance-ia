'use client'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import React, { useState, type FC } from 'react'
import { TransactionForm } from './transaction-form'
import type { Transaction } from '@prisma/client'

type EditTransactionButtonProps = {
  transaction: Transaction
}
const EditTransactionButton: FC<EditTransactionButtonProps> = ({
  transaction,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size={'icon'}
        className="text-muted-foreground"
      >
        <Pencil />
      </Button>
      <TransactionForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  )
}

export { EditTransactionButton }
