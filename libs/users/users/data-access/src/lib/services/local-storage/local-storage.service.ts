import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData<T>(data: T): void {
    localStorage.setItem('usersData', JSON.stringify(data));
  }

  getData<T>(): T[] | null {
    const data = localStorage.getItem('usersData');
    return data ? JSON.parse(data) : null;
  }
}
