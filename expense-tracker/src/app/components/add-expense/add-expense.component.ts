import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryList, Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup<any>;
  categories: string[] = categoryList

  constructor(private store: Store, private fb: FormBuilder, private service: ExpenseService, private dialogRef: MatDialogRef<AddExpenseComponent>) {
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
      id: this.service.generateUniqueId(),
      name: formValues.name,
      amount: formValues.amount!,
      category: formValues.category,
      date: new Date(formValues.date!)
    };

    this.store.dispatch(ExpenseActions.addExpense({ expense }));
    this.dialogRef.close(true);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
