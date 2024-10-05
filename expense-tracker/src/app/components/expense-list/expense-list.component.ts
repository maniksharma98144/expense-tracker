import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';
import { selectExpenses } from '../../store/expense.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  dataSource = new MatTableDataSource<Expense>();

  constructor(private store: Store, private router: Router) {
    this.store.select(selectExpenses).pipe(
      map(expenses => expenses ?? [])
    ).subscribe(expenses => {
      this.dataSource.data = expenses;
    });
  }

  ngOnInit() {
    this.store.dispatch(ExpenseActions.loadExpenses());
  }

  deleteExpense(id: number) {
    this.store.dispatch(ExpenseActions.deleteExpense({ id }));
  }

  addExpense() {
    this.router.navigate(['/add']);
  }
  
  viewChart() {
    this.router.navigate(['/chart']);
  }
}
