import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import {
  LocalStorageService,
  User,
  UsersApiService,
  usersInitialState,
  UsersState,
} from '@projects/data-access';
import { tapResponse } from '@ngrx/operators';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<User>(), collection: 'users' }),
  withState<UsersState>(usersInitialState),
  withComputed((store) => ({
    usersCount: computed(() => store.usersEntities().length),
  })),
  withMethods(
    (
      store,
      usersService = inject(UsersApiService),
      localStorageService = inject(LocalStorageService)
    ) => ({
      loadUsers: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          debounceTime(700),
          switchMap(() => {
            return usersService.getUsers().pipe(
              tapResponse({
                next: (users) => {
                  patchState(
                    store,
                    setAllEntities(users, { collection: 'users' })
                  );
                  localStorageService.saveData(users);
                },
                error: (error: HttpErrorResponse) => {
                  patchState(store, { error: error });
                },
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),

      editUser(user: User) {
        patchState(
          store,
          updateEntity(
            {
              id: user.id,
              changes: {
                username: user.username,
                name: user.name,
                phone: user.phone,
                email: user.email,
              },
            },
            { collection: 'users' }
          )
        );
        const updatedUsers = store.usersEntities();
        localStorageService.saveData(updatedUsers);
      },

      addUser: rxMethod(
        pipe(
          switchMap((user: User) => {
            return usersService.addUser(user).pipe(
              tap(() => {
                patchState(store, addEntity(user, { collection: 'users' }));
                const updatedUsers = store.usersEntities();
                localStorageService.saveData(updatedUsers);
              })
            );
          })
        )
      ),

      deleteUser: rxMethod(
        pipe(
          exhaustMap((user: User) => {
            return usersService.deleteUser(user.id).pipe(
              tap(() => {
                patchState(
                  store,
                  removeEntity(user.id, { collection: 'users' })
                );
                const updatedUsers = store.usersEntities();
                localStorageService.saveData(updatedUsers);
              })
            );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store, localStorageService = inject(LocalStorageService)) {
      const storedUsers = localStorageService.getData<User>();
      if (storedUsers && storedUsers.length > 0) {
        patchState(store, setAllEntities(storedUsers, { collection: 'users' }));
      } else {
        store.loadUsers();
      }
    },
  })
);
