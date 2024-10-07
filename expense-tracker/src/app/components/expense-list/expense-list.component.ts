import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';
import { selectExpenses } from '../../store/expense.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseSummaryComponent } from '../expense-summary/expense-summary.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort; // Sort for the table
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginator for the table

  dataSource!: MatTableDataSource<Expense>; // Data source for the table
  loading: boolean = true; // Loading state

  constructor(private store: Store, private dialog: MatDialog, private snackBar: MatSnackBar) {
    // Subscribe to expenses and set up data source
    this.store.select(selectExpenses).pipe(
      map(expenses => expenses ?? [])
    ).subscribe(expenses => {
      this.dataSource = new MatTableDataSource<Expense>(expenses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    // Simulate loading delay before dispatching action to load expenses
    setTimeout(() => {
      this.store.dispatch(ExpenseActions.loadExpenses());
      this.loading = false;
    }, 1000);
  }

  ngAfterViewInit() {
    // Set sort and paginator after view initialization
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Open dialog to confirm expense deletion
  deleteExpense(id: string) {
    const dialogRef = this.dialog.open(DeleteExpenseComponent, {
      width: '400px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ExpenseActions.deleteExpense({ id }));
        this.openSnackBar('Expense deleted successfully!', 'Close');
      }
    });
  }

  // Open dialog to add a new expense
  addExpense() {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ExpenseActions.loadExpenses());
        this.openSnackBar('Expense added successfully!', 'Close');
      }
    });
  }

  showSummary() {
    const dialogRef = this.dialog.open(ExpenseSummaryComponent, {
      width: '500px',
    });
  }

  // Open dialog to edit an existing expense
  editExpense(expense: Expense) {
    const dialogRef = this.dialog.open(EditExpenseComponent, {
      width: '500px',
      data: { expense },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ExpenseActions.loadExpenses());
        this.openSnackBar('Expense edited successfully!', 'Close');
      }
    });
  }

  // Show a snackbar notification
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration of the snackbar
      horizontalPosition: 'right', // Position on the horizontal axis
      verticalPosition: 'bottom', // Position on the vertical axis
      panelClass: ['custom-snackbar'] // Custom CSS class
    });
  }
}
