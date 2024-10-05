import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseChartComponent } from './components/expense-chart/expense-chart.component';

const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'add', component: AddExpenseComponent },
  { path: 'edit/:id', component: EditExpenseComponent },
  { path: 'chart', component: ExpenseChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
