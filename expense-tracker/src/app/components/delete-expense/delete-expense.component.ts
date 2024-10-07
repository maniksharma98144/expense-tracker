import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.css']
})
export class DeleteExpenseComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteExpenseComponent>, // Reference to the dialog
    @Inject(MAT_DIALOG_DATA) public data: { id: string } // Data passed to the dialog
  ) { }

  // Close dialog without confirming
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Close dialog with confirmation
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
