export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: Date;
}

export interface ExpenseForm {
  name: string;
  amount: number;
  category: string;
  date: Date;
}

export const categoryList: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Health', 'Others'];