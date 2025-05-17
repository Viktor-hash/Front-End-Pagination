interface ITransaction {
  transactions: IExpense[];
  next: IPage;
  previous: IPage;
  totalPages: number;
  currentPage: number;
}

interface IPage{
  page: number;
  limit: number;
}

interface IExpense {
  id: number;
  date: Date;
  amount: number;
  merchant: string;
  category: string;
}

export type { ITransaction, IPage, IExpense };