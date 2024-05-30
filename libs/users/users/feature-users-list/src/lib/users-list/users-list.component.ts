import { Component, input, output } from '@angular/core';
import { UsersCardComponent } from '../users-card/users-card.component';
import { User } from '@projects/data-access';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [UsersCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  public readonly users = input.required<User[]>();
  public readonly deleteUser = output<User>();
  public readonly editUser = output<User>();

  deleteUserEvent(user: User) {
    this.deleteUser.emit(user);
  }

  editUserEvent(user: User) {
    this.editUser.emit(user);
  }
}
