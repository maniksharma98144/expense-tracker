import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';
import { selectExpenseById } from '../../store/expense.selectors';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup<any>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.expenseForm = this.fb.group({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      category: new FormControl<string>('', Validators.required),
      date: new FormControl<Date | null>(new Date(), Validators.required)
    });
  }

  ngOnInit() {
    this.store.select(selectExpenseById(this.id)).subscribe(data => {
      this.expenseForm.patchValue(data as Expense);
    });
  }

  updateExpense() {
    if (this.expenseForm.valid) {
      this.store.dispatch(ExpenseActions.updateExpense({ expense: { id: this.id, ...this.expenseForm.value } }));
      this.router.navigate(['/']);
    }
  }
}
