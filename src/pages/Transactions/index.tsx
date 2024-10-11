import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const {transactions} = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
          <TransactionsTable>
            <tbody>
              {transactions.map(transactions => {
                return (
                  <tr key={transactions.id}>
                    <td width="50%">{transactions.description}</td>
                    <td>
                      <PriceHighlight variant={transactions.type}>
                        {transactions.type == 'outcome' && '- '}
                        {priceFormatter.format(transactions.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transactions.category}</td>
                    <td>{dataFormatter.format(new Date(transactions.createdAt))}</td>
                  </tr>

                )
              })}
            </tbody>
          </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}