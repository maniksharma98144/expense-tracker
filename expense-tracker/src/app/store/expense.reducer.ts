import { createReducer, on } from '@ngrx/store';
import * as ExpenseActions from './expense.actions';
import { ExpenseState } from '../models/expenseState.model';

export const initialState: ExpenseState = {
  expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
};

export const expenseReducer = createReducer(
  initialState,
  on(ExpenseActions.loadExpensesSuccess, (state, { expenses }) => ({
    ...state,
    expenses,
  })),
  on(ExpenseActions.addExpense, (state, { expense }) => {
    const newExpenses = [...state.expenses, expense];
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
    return { ...state, expenses: newExpenses };
  }),
  on(ExpenseActions.updateExpense, (state, { expense }) => {
    const updatedExpenses = state.expenses.map(e => e.id === expense.id ? expense : e);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    return { ...state, expenses: updatedExpenses };
  }),
  on(ExpenseActions.deleteExpense, (state, { id }) => {
    const filteredExpenses = state.expenses.filter(e => e.id !== id);
    localStorage.setItem('expenses', JSON.stringify(filteredExpenses));
    return { ...state, expenses: filteredExpenses };
  })
);
