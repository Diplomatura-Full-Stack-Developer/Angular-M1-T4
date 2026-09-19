import { inject, Service, signal } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
@Service()
export class Products {

  private apiUrl = 'data/products.json';

  private http = inject(HttpClient);

  private persist(): void {
    localStorage.setItem('products', JSON.stringify(this.products()));
  }

  products = signal<IProduct[]>([]);

  loadProducts(): void {
    const stored = localStorage.getItem('products');
    if (stored !== null) {
      this.products.set(JSON.parse(stored) as IProduct[]);
      return;
    }

    this.http.get<IProduct[]>(this.apiUrl).subscribe((data) => {
      const withIds = data.map((p) => ({ ...p, id: crypto.randomUUID() }));
      this.products.set(withIds);
      this.persist();
    });
  }

  addProduct(product: IProduct): void {
    this.products.update((list) => [...list, product]);
    this.persist();
  }

  deleteProduct(id: string): void {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, deleted: true } : p)),
    );
    this.persist();
  }


}
