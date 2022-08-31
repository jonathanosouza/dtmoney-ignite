import { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchFormInputs, TransactionContext } from "../../transactionsContex";
import { SearchPesquisa, TransitionsContainer, TransitionsList } from "./TransationStyles";
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { api } from "../../lib/axios";


// const searchFormSchema = z.object({
//   query: z.string()
// })








export function Transitions(){
  const {transactions, register, handleSubmit} = useContext(TransactionContext)









  function handleSearchTransactions(data : SearchFormInputs){
    console.log(data)
  }

   function handleChangeAsk(e: FormEvent){
      e.preventDefault()
    }


  return (

<>
  <SearchPesquisa onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
      type="text"  
      placeholder="Pesquisar Transação"
      {...register('query')}
      />
      <button> Pesquisar </button>
      </SearchPesquisa>
    <TransitionsContainer>
          
    <TransitionsList>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
          {transactions.map(transaction => (
             <tr key={transaction.id}>
              <td >{transaction.title}</td>
              <td className={transaction.type}> R$ {transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.creaatedAt}</td>
             </tr>
          )
           
           )}
          </tbody>
          </table>
      </TransitionsList>

      </TransitionsContainer>
      </>
  )
}