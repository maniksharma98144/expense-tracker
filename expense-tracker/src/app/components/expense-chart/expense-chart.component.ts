import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense.model';
import { selectExpenses } from '../../store/expense.selectors';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.css']
})
export class ExpenseChartComponent {
  expenses$: Observable<Expense[]>;

  chartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        data: [],
        fill: false,
        borderColor: 'blue',
      },
    ],
  };

  constructor(private store: Store) {
    this.expenses$ = this.store.select(selectExpenses);
    this.expenses$.subscribe(expenses => {
      this.chartData.labels = expenses.map(e => e.name);
      this.chartData.datasets[0].data = expenses.map(e => e.amount);
    });
  }
}
