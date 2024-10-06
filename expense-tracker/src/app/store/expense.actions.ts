import { createAction, props } from '@ngrx/store';
import { Expense } from '../models/expense.model';

export const loadExpenses = createAction('[Expense] Load Expenses');
export const loadExpensesSuccess = createAction(
  '[Expense] Load Expenses Success',
  props<{ expenses: Expense[] }>()
);
export const loadExpensesFailure = createAction(
  '[Expense] Load Expenses Failure',
  props<{ error: any }>()
);
export const addExpense = createAction(
  '[Expense] Add Expense',
  props<{ expense: Expense }>()
);
export const updateExpense = createAction(
  '[Expense] Update Expense',
  props<{ expense: Expense }>()
);
export const deleteExpense = createAction(
  '[Expense] Delete Expense',
  props<{ id: string }>()
);
