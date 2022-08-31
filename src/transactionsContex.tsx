import { createContext, FormEvent, ReactNode, useEffect, useState } from "react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "./lib/axios";



interface Transaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  creaatedAt: string
}



// type TransactionInput = Omit<Transaction,'id' | 'creaatedAt'>


interface TransactionContextData {
  transactions: Transaction[],
  handleCreateNewTransaction: FormEvent
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  creaatedAt: Date,
  // createTransaction : (transation: TransactionInput) => void

}
interface TransactionsProvaiderProps {
  children: ReactNode
}

export const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
  );


  const searchFormSchema = z.object({
    query: z.string()
  })
  export type SearchFormInputs = z.infer<typeof searchFormSchema>

export function  TransactionsProvaider({children} : TransactionsProvaiderProps){

  const [title , setTitle] = useState('')
  const [search , setSearch] = useState('')
  const [amount, setAmount] = useState()
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')
  const [transactions , setTransactions] = useState<Transaction[]>([])


const {register, handleSubmit} = useForm<SearchFormInputs>({
  resolver: zodResolver(searchFormSchema)
})


async function loadTransactions(query?: string){
  const response = await api.get ('transactions', {
    params: {
      q: query
    }
  })
 
  setTransactions(response.data)

}

useEffect(() => {
  loadTransactions()
}, [])


  //  async function loadTransactions(query : string){
  //     const response = await api.get('transactions' , {
  //       params: {
  //         q: query
  //       }
  //     })

  //     // const data = await reponse.json()

  //     setTransactions(response.data)
  //   }

  //   useEffect(() => {
  //     loadTransactions()
  // }, [])

  function handleCreateNewTransaction(event : FormEvent){
    event.preventDefault();

    const newtransaction = {
      id: 1,
      title: title,
      amount: amount,
      type: type,
      category: category,
      creaatedAt: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setTransactions([...transactions, newtransaction])
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
  }

  

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, []);

// function createTransaction (transaction) {
//   api.post('/transactions', transaction)
// }

  return (
    <TransactionContext.Provider value={{transactions, setTitle, title, setAmount, amount, category, setCategory, type , handleCreateNewTransaction, setTransactions , register, handleSubmit, setType}}>
      {children}
    </TransactionContext.Provider>
  )
  
}


