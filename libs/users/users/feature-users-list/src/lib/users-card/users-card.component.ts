import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { User } from '@projects/data-access';

@Component({
  selector: 'users-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatButton,
  ],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {
  public readonly user = input.required<User>();
  public readonly deleteUser = output<User>();
  public readonly editUser = output<User>();

  onDeleteClick(user: User) {
    this.deleteUser.emit(user);
  }

  onEditClick(user: User) {
    this.editUser.emit(user);
  }
}
