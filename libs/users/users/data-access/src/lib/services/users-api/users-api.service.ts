import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@projects/http';
import { User } from '@projects/data-access';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  apiService = inject(ApiService);

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users');
  }

  deleteUser(deleteUserId: number) {
    return this.apiService.delete<User>(`/users/${deleteUserId}`);
  }

  editUser(user: User) {
    return this.apiService.put<User, User>(`/users/${user.id}`, user);
  }

  addUser(user: User) {
    return this.apiService.post<User, User>('/users', user);
  }
}
