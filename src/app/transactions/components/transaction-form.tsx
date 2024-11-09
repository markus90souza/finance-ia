import { DatePicker } from '@/components/date-picker'
import { MoneyInput } from '@/components/money-input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  TRANSACTION_TYPE_OPTIONS,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
} from '@/constants'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import React, { type FC } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  TransactionCategory,
  TransactionType,
  TransactionPaymentMethod,
} from '@prisma/client'
import { upInsertTransaction } from '@/actions/add-transaction'

const transactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome da transação é obrigatorio',
  }),
  amount: z.number().min(1, {
    message: 'O valor da transação é obrigatorio',
  }),
  type: z.nativeEnum(TransactionType, {
    required_error: 'O tipo da transação é obrigatorio',
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: 'A categoria da transação é obrigatorio',
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: 'O metodo de pagamento da transação é obrigatorio',
  }),

  date: z.date({
    required_error: 'A data da transação é obrigatorio',
  }),
})

type TransactionForm = z.infer<typeof transactionFormSchema>

type TransactionFormProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  defaultValues?: TransactionForm
  transactionId?: string
}

export const TransactionForm: FC<TransactionFormProps> = ({
  isOpen,
  setIsOpen,
  defaultValues,
  transactionId,
}) => {
  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
      amount: 50,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.EDUCATION,
      paymentMethod: TransactionPaymentMethod.CASH,
      date: new Date(),
    },
  })

  const onSubmit = async (data: TransactionForm) => {
    try {
      console.log(data)
      await upInsertTransaction({
        ...data,
        id: transactionId,
      })
      setIsOpen(false)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  const isUpdate = !!transactionId
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Editar Transação' : 'Adicionar Transação'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>

                  <MoneyInput
                    placeholder="R$ 0.000,00"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo da transação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>

                  <DatePicker date={field.value} onChange={field.onChange} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button className="w-full" variant={'outline'}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="w-full">
                {isUpdate ? 'Editar' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
