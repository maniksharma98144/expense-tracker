import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense.model';
import * as ExpenseActions from '../../store/expense.actions';
import { selectExpenseById } from '../../store/expense.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(selectExpenseById(id)).subscribe(data=>{
      this.expenseForm.patchValue(data as Expense);
    });
  }

  updateExpense() {
    if (this.expenseForm.valid) {
      this.store.dispatch(ExpenseActions.updateExpense({ expense: this.expenseForm.value }));
      this.router.navigate(['/']);
    }
  }
}
