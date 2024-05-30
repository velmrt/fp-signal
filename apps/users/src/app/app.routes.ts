import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('@projects/feature-users-list').then(
        (c) => c.UsersListContainerComponent
      ),
  },
];
