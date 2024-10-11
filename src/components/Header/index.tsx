import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logo from '../../assets/image/Logo.svg'
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionsModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo}/>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

         <NewTransactionModal />

        </Dialog.Root>
       
      </HeaderContent>
    </HeaderContainer>
  )
}