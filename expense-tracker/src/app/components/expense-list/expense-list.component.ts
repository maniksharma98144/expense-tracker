import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';
import { selectExpenses } from '../../store/expense.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Expense>;

  constructor(private store: Store, private router: Router) {
    this.store.select(selectExpenses).pipe(
      map(expenses => expenses ?? [])
    ).subscribe(expenses => {
      this.dataSource = new MatTableDataSource<Expense>(expenses);
    });
  }

  ngOnInit() {
    this.store.dispatch(ExpenseActions.loadExpenses());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  deleteExpense(id: number) {
    this.store.dispatch(ExpenseActions.deleteExpense({ id }));
  }

  addExpense() {
    this.router.navigate(['/add']);
  }
}
