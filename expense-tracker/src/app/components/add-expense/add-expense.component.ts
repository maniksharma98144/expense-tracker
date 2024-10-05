import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Expense, ExpenseForm } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup<any>;

  private static currentId = 1;

  constructor(private store: Store, private router: Router, private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      category: new FormControl<string>('', Validators.required),
      date: new FormControl<Date | null>(new Date(), Validators.required)
    });
  }

  ngOnInit() { }

  addExpense() {
    const formValues = this.expenseForm.value;

    const expense: Expense = {
      id: AddExpenseComponent.currentId++,
      name: formValues.name,
      amount: formValues.amount!,
      category: formValues.category,
      date: new Date(formValues.date!)
    };

    this.store.dispatch(ExpenseActions.addExpense({ expense }));
    this.router.navigate(['/']);
  }
}
