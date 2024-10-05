import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { expenseReducer } from './store/expense.reducer';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseChartComponent } from './components/expense-chart/expense-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    ExpenseListComponent,
    ExpenseChartComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ expense: expenseReducer }),
    BaseChartDirective
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
