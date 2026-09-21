import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { catchError, of } from 'rxjs';

@Service()
export class UserService {

  private apiUrl = 'data/users.json';

  private http = inject(HttpClient);

  private persist(): void {
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

  users = signal<IUser[]>([]);

  session = signal<IUser | undefined>(undefined);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  seedUsers(): void {
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

  loginUser(email: string, password: string): void {
    this.session.set(this.users().find((user) => user.email === email && user.password === password));
    if (this.session()) {
      localStorage.setItem('session', JSON.stringify(this.session()));
    }
  }

  logoutUser(): void {
    this.session.set(undefined);
    localStorage.removeItem('session');
  }

  deleteUser(id: string): void {
    this.users.update((users) => users.filter((user) => user.id !== id));
    this.persist();
  }
}
