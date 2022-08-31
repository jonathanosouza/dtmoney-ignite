import { AddTransitionContainer, ButtonRadioChoice, ChoiceInput, FotterContainer, ReturnHome, TransitionContainer } from "./DashBoardstyles";
import { FormEvent, useContext, useState } from "react";
import { TransactionContext } from "../../transactionsContex";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import input from './../../../assets/income.svg'
import output from  './../../../assets/outcome.svg'



export function DashBoard(){
  const {setTransactions, handleCreateNewTransaction, category, setAmount, setCategory, title, setTitle, type, setType} = useContext(TransactionContext);
  


  //  const {register, handleSubmit} = useForm<any>({

//  })
 
//  async function handleNewCreateTransaction(data : string) {
//     event?.preventDefault()
//     console.log(data)
  
//  }


  return (
    <TransitionContainer
    onSubmit={handleCreateNewTransaction} 
    >
      <ReturnHome ><Link to="/">x</Link></ReturnHome>

      <strong>
        Cadastar Transação
      </strong>
      
      <AddTransitionContainer >
      <input  
      type="text"  
      placeholder="Descrição"
      onChange ={e => setTitle(e.target.value)}

      />

      <input 
      type="number"  
      placeholder="Preço"
      onChange ={e => setAmount(e.target.value)}

      // {...register('amount' , {valueAsNumber : true})
      /> 
      </AddTransitionContainer>
    

      <ChoiceInput> 
        <ButtonRadioChoice 
         type="button"
         value={type}
         onClick = {() => setType('withdraw')}
        // {...register('type')}
        ><img src={input} alt="" /> Entrada </ButtonRadioChoice>


        <ButtonRadioChoice 
        type="button"
        value = {type}
        onClick = {() => setType('deposit')}
      
        ><img src={output} alt="" /> Saida </ButtonRadioChoice>

        
      </ChoiceInput>
      
      <FotterContainer>
      <input 
      type="text"  
      placeholder="Categoria"
      value={category}
      onChange ={e => setCategory(e.target.value)}
      />

      <button>Cadastrar</button>

      </FotterContainer>

    </TransitionContainer>
  )
}