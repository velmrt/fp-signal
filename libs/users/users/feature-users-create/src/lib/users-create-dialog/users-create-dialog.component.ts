import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { UsersCreateFormService } from './users-create-form.service';

@Component({
  selector: 'users-create-dialog',
  standalone: true,
  imports: [
    MatError,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './users-create-dialog.component.html',
  styleUrl: './users-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<UsersCreateDialogComponent>);
  private readonly usersCreateForm = inject(UsersCreateFormService);
  private readonly data = inject(MAT_DIALOG_DATA);
  public userForms!: FormGroup;
  @Input() isEdit!: boolean;

  ngOnInit() {
    this.data
      ? (this.userForms = this.usersCreateForm.userCreateForm(this.data))
      : (this.userForms = this.usersCreateForm.userCreateForm());
  }

  public saveUser(): void {
    if (this.userForms.valid) {
      this.dialogRef.close(this.userForms.value);
    }
  }
}
