import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ExpenseActions from '../../store/expense.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categoryList } from '../../models/expense.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup<any>;
  categories: string[] = categoryList

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.expenseForm = this.fb.group({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      category: new FormControl<string>('', Validators.required),
      date: new FormControl<Date | null>(new Date(), Validators.required)
    });
  }

  ngOnInit() {
    this.expenseForm.patchValue(this.data.expense);
    console.log(this.expenseForm)
  }

  updateExpense() {
    if (this.expenseForm.valid) {
      this.store.dispatch(ExpenseActions.updateExpense({ expense: { id: this.data.expense.id, ...this.expenseForm.value } }));
      this.dialogRef.close(true);
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
