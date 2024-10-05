import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Expense } from '../../models/expense.model';
import { selectExpenses } from '../../store/expense.selectors';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.css'],
})
export class ExpenseChartComponent implements OnInit, OnDestroy {
  expenses$!: Observable<Expense[]>;
  expensesSubscription!: Subscription;

  chartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        data: [],
        fill: false,
        borderColor: 'blue',
        tension: 0.4,
        pointBackgroundColor: 'blue',
        pointBorderColor: '#fff',
        pointRadius: 5,
      },
    ],
  };

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          color: '#555',
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          stepSize: 50,
          color: '#555',
        },
      },
    },
  };

  constructor(private store: Store) { }

  ngOnInit() {
    this.expenses$ = this.store.select(selectExpenses);
    this.expensesSubscription = this.expenses$.subscribe((expenses) => {
      this.chartData.labels = expenses.map((e) => e.name);
      this.chartData.datasets[0].data = expenses.map((e) => e.amount);
    });
  }

  ngOnDestroy() {
    if (this.expensesSubscription) {
      this.expensesSubscription.unsubscribe();
    }
  }
}
