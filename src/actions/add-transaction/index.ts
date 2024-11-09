'use server'

import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { transactionSchema } from './schema'
import { revalidatePath } from 'next/cache'

interface TransactionData {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upInsertTransaction = async (data: TransactionData) => {
  transactionSchema.parse(data)

  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.transaction.upsert({
    where: {
      id: data.id,
    },
    create: { ...data, userId },
    update: { ...data, userId },
  })

  revalidatePath('/transactions')
}
