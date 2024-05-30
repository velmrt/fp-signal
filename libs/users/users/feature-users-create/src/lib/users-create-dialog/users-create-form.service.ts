import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@projects/data-access';

@Injectable({
  providedIn: 'root',
})
export class UsersCreateFormService {
  private readonly fb = inject(FormBuilder);

  public userCreateForm(user?: User) {
    return this.fb.group({
      id: [user?.id || new Date().getTime()],
      name: [user?.name || '', Validators.required],
      username: [user?.username || '', Validators.required],
      email: [user?.email || '', Validators.required],
      phone: [user?.phone || '', Validators.required],
    });
  }
}
