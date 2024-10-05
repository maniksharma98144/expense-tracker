import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import * as ExpenseActions from './expense.actions';
import { Expense } from '../models/expense.model';
import { of } from 'rxjs';

@Injectable()
export class ExpenseEffects {
  constructor(private actions$: Actions) { }

  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      map(() => {
        const expenses: Expense[] = JSON.parse(localStorage.getItem('expenses') || '[]');
        return ExpenseActions.loadExpensesSuccess({ expenses });
      }),
      catchError(error => {
        console.error('Error loading expenses:', error);
        return of(ExpenseActions.loadExpensesFailure({ error }));
      })
    )
  );
}
