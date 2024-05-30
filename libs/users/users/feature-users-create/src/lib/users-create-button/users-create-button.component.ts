import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'users-create-button',
  standalone: true,
  imports: [CommonModule, MatIcon, MatFabButton],
  templateUrl: './users-create-button.component.html',
  styleUrl: './users-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateButtonComponent {
  addUserEvent = output<void>();
}
