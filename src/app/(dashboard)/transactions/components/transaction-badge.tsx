import { Badge } from '@/components/ui/badge'
import { TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'
import type { FC } from 'react'

type TransactionBadgeProps = {
  type: TransactionType
}
const TransactionBadge: FC<TransactionBadgeProps> = ({ type }) => {
  if (type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon size={10} className="mr-2 fill-primary" />
        Depósito
      </Badge>
    )
  }

  if (type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon size={10} className="mr-2 fill-danger" />
        Despesa
      </Badge>
    )
  }

  if (type === TransactionType.INVESTMENT) {
    return (
      <Badge className="bg-white bg-opacity-10 font-bold text-white">
        <CircleIcon size={10} className="mr-2 fill-white" />
        Investimento
      </Badge>
    )
  }
}

export { TransactionBadge }
