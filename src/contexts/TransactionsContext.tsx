import { ReactNode, createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { api } from "../lib/axios";

interface Transactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: Date;
}

interface TransactionsContextType {
  transactions: Transactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsContextProps {
  children: ReactNode;
}

interface CreateTransactionInput {
  description: string;
  price: number;  
  category: string;
  type: 'income' | 'outcome';
  createdAt: Date;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
     params : {
        _sort: '-createdAt'
      }
    });

    const data = await response.data;

    if (query) {
      const filteredData = data.filter((transaction: Transactions) => {
      const formattedDate = format(new Date(transaction.createdAt), "dd/MM/yyyy");
        return (
          transaction.description.toLowerCase().includes(query.toLowerCase()) ||
          transaction.price.toString().includes(query) ||
          transaction.category.toLowerCase().includes(query.toLowerCase()) ||
          formattedDate.includes(query)
        );
      });
      setTransactions(filteredData);
    } else {
      setTransactions(data);
    }
  }

  async function createTransaction(data: CreateTransactionInput) {
    const {description, category, price, type} = data;
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}
