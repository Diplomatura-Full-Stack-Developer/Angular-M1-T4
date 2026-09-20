import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { catchError, of } from 'rxjs';

@Service()
export class Users {

  private apiUrl = 'data/users.json';

  private http = inject(HttpClient);

  private persist(): void {
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

  users = signal<IUser[]>([]);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  loadUsers(): void {
    const stored = localStorage.getItem('users');
    if (stored !== null) {
      this.users.set(JSON.parse(stored) as IUser[]);
      return;
    }

    this.http.get<IUser[]>(this.apiUrl).pipe(
      catchError((error) => {
        this._error.set(`Error loading users: ${error.message}`);
        return of([]);
      }),
    ).subscribe((data) => {
      if (data.length === 0 && this._error()) {
        return;
      }
      const withIds = data.map((u) => ({ ...u, id: crypto.randomUUID() }));
      this.users.set(withIds);
      this.persist();
    });
  }

  registerUser(user: IUser): void {
    this.users.update((users) => [...users, user]);
    this.persist();
  }

  deleteUser(id: string): void {
    this.users.update((users) => users.filter((user) => user.id !== id));
    this.persist();
  }
}
