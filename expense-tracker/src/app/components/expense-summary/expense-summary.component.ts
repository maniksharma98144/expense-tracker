import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectExpenses } from '../../store/expense.selectors';
import { Expense } from '../../models/expense.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {
  expenses$!: Observable<Expense[]>;
  totalExpenses: number = 0;
  categorizedExpenses: { [key: string]: number } = {};

  constructor(private store: Store, private dialogRef: MatDialogRef<ExpenseSummaryComponent>) { }

  ngOnInit() {
    this.expenses$ = this.store.select(selectExpenses);
    this.expenses$.subscribe(expenses => {
      this.calculateSummary(expenses);
    });
  }

  calculateSummary(expenses: Expense[]) {
    this.totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    this.categorizedExpenses = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
