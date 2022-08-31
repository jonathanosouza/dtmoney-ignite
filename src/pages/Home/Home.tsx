import { Container, DashContainer, DashInPut, DashOutPut, DashTotal } from "./HomeStyles";
import input from '../../../assets/income.svg'
import output from '../../../assets/outcome.svg'
import total from '../../../assets/Vector.png'
import { Transitions } from "../Transitions/Transations";
import { useCallback, useContext } from "react";
import { TransactionContext } from "../../transactionsContex";


export function Home(){
    const {transactions} = useContext(TransactionContext);

    // const QuantityDeposit = transactions.reduce(function(acc, transaction){
    //     return 
    // },0)

    // let  QuantityDeposit = 0
 
    // // for(const transaction of transactions){
    // //   if (transaction.type === 'deposit'){
    // //   QuantityDeposit = QuantityDeposit + transaction.amount}
    // // }

    // // let   QuantityWithdraw = 0  
    // // for(const transaction of transactions){
    // //   if (transaction.type === 'withdraw'){
    // //     QuantityWithdraw = QuantityWithdraw + transaction.amount}
    // // }

    // // const TotalAcount = QuantityWithdraw - QuantityDeposit

    const quantity = transactions.reduce((acc, transaction) => { 
      if(transaction.type  === 'deposit') {
        acc.deposit += transaction.amount
        acc.total -= transaction.amount
      } else{
        acc.withdraw += transaction.amount
        acc.total += transaction.amount

      }
      return acc}, 
    {deposit: 0, 
     withdraw: 0, 
     total:0})

  return (
    <Container>
   <DashContainer>

      <DashInPut>
      <header>
        <span>Entradas</span>
        <img src={input} alt="" />
       </header>

       <div>
        <strong> R$ {quantity.withdraw}</strong>
       </div>

      </DashInPut>

      <DashOutPut>
      <header>
        <span>Saídas</span>
        <img src={output} alt="" />
       </header>

       <div>
        <strong> R$ {quantity.deposit}</strong>
       </div>
      </DashOutPut>

      <DashTotal>
      <header>
        <span>Total</span>
        <img src={total} alt="" />
       </header>

       <div>
        <strong> R$ {quantity.total}</strong>
       </div>
      </DashTotal>
   </DashContainer>

   <Transitions/>
   </Container>

  )
}