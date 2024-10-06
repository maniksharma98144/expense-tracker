import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrl: './delete-expense.component.css'
})
export class DeleteExpenseComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
