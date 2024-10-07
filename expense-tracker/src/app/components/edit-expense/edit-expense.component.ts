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
  expenseForm: FormGroup<any>; // Form for editing expenses
  categories: string[] = categoryList; // List of expense categories

  constructor(
    private store: Store, // State management
    private fb: FormBuilder, // Form builder
    private dialogRef: MatDialogRef<EditExpenseComponent>, // Dialog reference
    @Inject(MAT_DIALOG_DATA) public data: any // Data passed to the dialog
  ) {
    // Initialize form with controls and validations
    this.expenseForm = this.fb.group({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      category: new FormControl<string>('', Validators.required),
      date: new FormControl<Date | null>(new Date(), Validators.required)
    });
  }

  ngOnInit() {
    // Patch form values with existing expense data
    this.expenseForm.patchValue(this.data.expense);
    console.log(this.expenseForm);
  }

  // Update expense in the store
  updateExpense() {
    if (this.expenseForm.valid) {
      this.store.dispatch(ExpenseActions.updateExpense({
        expense: { id: this.data.expense.id, ...this.expenseForm.value }
      }));
      this.dialogRef.close(true);
    }
  }

  // Close dialog without saving
  closeDialog() {
    this.dialogRef.close(false);
  }
}
