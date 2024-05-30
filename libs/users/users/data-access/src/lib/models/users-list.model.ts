import { HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';

export type UsersState = {
  users: User[];
  isLoading: boolean;
  error: HttpErrorResponse | null;
};

export const usersInitialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};
