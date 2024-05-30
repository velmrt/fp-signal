import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '@projects/data-access';
import { UiConfirmDialogComponent } from '@projects/ui';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersStore } from '../../../../data-access/src/lib/users.store';
import { UsersCardComponent } from '../users-card/users-card.component';
import { UsersCreateDialogComponent } from '../../../../feature-users-create/src/lib/users-create-dialog/users-create-dialog.component';
import { UsersCreateButtonComponent } from '@projects/feature-users-create';

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [
    UsersCardComponent,
    MatProgressSpinner,
    MatProgressBar,
    UsersListComponent,
    UsersCreateButtonComponent,
  ],
  templateUrl: './users-list-container.component.html',
  styleUrl: './users-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListContainerComponent {
  readonly store = inject(UsersStore);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  deleteUser(user: User) {
    const dialogRef: MatDialogRef<UiConfirmDialogComponent> = this.dialog.open(
      UiConfirmDialogComponent,
      {
        data: { dialogText: `Вы уверены что хотите удалить ${user.name}` },
      }
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.store.deleteUser(user);
        }
      });
  }

  addUser(isEdit: boolean) {
    const dialogRef = this.dialog.open(UsersCreateDialogComponent, {
      width: '300px',
    });
    dialogRef.componentInstance.isEdit = isEdit;
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.store.addUser(result);
        }
      });
  }

  editUser(user: User, isEdit: boolean) {
    const dialogRef = this.dialog.open(UsersCreateDialogComponent, {
      width: '300px',
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
    dialogRef.componentInstance.isEdit = isEdit;

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.store.editUser(result);
        }
      });
  }
}
