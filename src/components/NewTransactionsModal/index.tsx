import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionsType, TransactionsTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext);

  const { 
    control,
    register, 
    handleSubmit,
    formState: {isSubmitting},
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    const {description, category, price, type} = data; 

    await createTransaction({
      description,
      price,
      category,
      type,
      
    })
   
    reset();
  }

  return (
    <Dialog.Portal>
    <Overlay />
    
    <Content>
      <Dialog.Title>Nova Transação</Dialog.Title>

      <CloseButton>
        <X size={24}/>
      </CloseButton>

      <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <input 
          type="text" 
          placeholder="Descrição" 
          required
          {...register('description')}
        />
        <input 
          type="number"
          placeholder="Preço" 
          required
          {...register('price', { valueAsNumber: true})}
        />
        <input 
          type="text" 
          placeholder="Categoria" 
          required
          {...register('category')}
        />
        
        <Controller 
          control={control}
          name="type"
          render={({ field }) => {
            return(
              <TransactionsType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionsTypeButton 
                  variant="income" 
                  value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionsTypeButton>

                <TransactionsTypeButton 
                  variant="outcome" 
                  value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionsTypeButton>
              </TransactionsType>
            )
          }}
        />

        <button type="submit" disabled={isSubmitting}>
          Cadastrar
        </button>
      </form>
    </Content>
    
  </Dialog.Portal>
  )
}