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
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Expense>;

  constructor(private store: Store, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.store.select(selectExpenses).pipe(
      map(expenses => expenses ?? [])
    ).subscribe(expenses => {
      this.dataSource = new MatTableDataSource<Expense>(expenses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.store.dispatch(ExpenseActions.loadExpenses());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  deleteExpense(id: string) {
    const dialogRef = this.dialog.open(DeleteExpenseComponent, {
      width: '400px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ExpenseActions.deleteExpense({ id }));
        this.openSnackBar('Expense deleted successfully!', 'Close')
      }
    });
  }

  addExpense() {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ExpenseActions.loadExpenses());
        this.openSnackBar('Expense added successfully!', 'Close')
      }
    });
  }

  editExpense(expense: Expense) {
    const dialogRef = this.dialog.open(EditExpenseComponent, {
      width: '500px',
      data: { expense },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ExpenseActions.loadExpenses());
        this.openSnackBar('Expense edited successfully!', 'Close')
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }
}
