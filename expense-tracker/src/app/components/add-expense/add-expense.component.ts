import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  
  private static currentId = 1;

  constructor(private store: Store, private router: Router, private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  ngOnInit() {}

  addExpense() {
    const expense: Expense = {
      id: AddExpenseComponent.currentId++,
      name: this.expenseForm.value.name,
      amount: this.expenseForm.value.amount,
      category: this.expenseForm.value.category,
      date: new Date(this.expenseForm.value.date)
    };

    this.store.dispatch(ExpenseActions.addExpense({ expense }));
    this.router.navigate(['/']);
  }
}
