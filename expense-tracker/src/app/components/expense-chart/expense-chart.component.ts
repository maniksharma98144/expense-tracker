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
  expenses$!: Observable<Expense[]>; // Observable for expenses
  expensesSubscription!: Subscription; // Subscription to expenses
  loading: boolean = true; // Loading state

  // Chart data structure
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

  // Chart options configuration
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
    // Simulate loading delay before fetching expenses
    setTimeout(() => {
      this.expenses$ = this.store.select(selectExpenses);
      this.expensesSubscription = this.expenses$.subscribe((expenses) => {
        // Update chart data with fetched expenses
        this.chartData.labels = expenses.map((e) => e.name);
        this.chartData.datasets[0].data = expenses.map((e) => e.amount);
      });
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy() {
    // Unsubscribe from expenses on component destroy
    if (this.expensesSubscription) {
      this.expensesSubscription.unsubscribe();
    }
  }
}
