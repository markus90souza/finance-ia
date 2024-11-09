'use client'
import { ArrowDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { TransactionForm } from '@/app/transactions/components/transaction-form'
import { useState } from 'react'

const TransactionButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button className="gap-2 font-bold" onClick={() => setIsDialogOpen(true)}>
        Adicionar transação
        <ArrowDownUp />
      </Button>

      <TransactionForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  )
}

export { TransactionButton }
