import { inject, Service, signal } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
@Service()
export class ProductService {

  private apiUrl = 'data/products.json';

  private http = inject(HttpClient);

  private persist(): void {
    localStorage.setItem('products', JSON.stringify(this.products()));
  }

  products = signal<IProduct[]>([]);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  seedProducts(): void {
    const stored = localStorage.getItem('products');
    if (stored !== null) {
      this.products.set(JSON.parse(stored) as IProduct[]);
      return;
    }

    this.http.get<IProduct[]>(this.apiUrl).pipe(
      catchError((error) => {
        this._error.set(`Error loading products: ${error.message}`);
        return of([]);
      }),
    ).subscribe((data) => {
      if (data.length === 0 && this._error()) {
        return;
      }
      const withIds = data.map((p) => ({ ...p, id: crypto.randomUUID() }));
      this.products.set(withIds);
      this._error.set(null);
      this.persist();
    });
  }

  addProduct(product: IProduct): void {
    try {
      this.products.update((list) => [...list, product]);
      this.persist();
    } catch (error) {
      this._error.set(`Error adding product: ${error as string}`);
    }
  }

  deleteProduct(id: string): void {
    try {
      this.products.update((list) =>
        list.map((p) => (p.id === id ? { ...p, deleted: true } : p)),
      );
      this.persist();
    } catch (error) {
      this._error.set(`Error deleting product: ${error as string}`);
    }
  }

}
