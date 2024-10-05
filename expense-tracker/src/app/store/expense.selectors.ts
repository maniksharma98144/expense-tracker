import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState } from '../models/expenseState.model';

export const selectExpenseState = createFeatureSelector<ExpenseState>('expense');

export const selectExpenses = createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.expenses
);

export const selectExpenseById = (id: number) => createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.expenses.find(expense => expense.id === id)
);
