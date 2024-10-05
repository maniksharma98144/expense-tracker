export interface Expense {
  id: number;
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