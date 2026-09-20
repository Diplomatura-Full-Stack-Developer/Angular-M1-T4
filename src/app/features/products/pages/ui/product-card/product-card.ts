import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '../../../interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { Products } from '../../../services/product.service';
import { DiscountPipe } from '../../../../../shared/pipes/discount.pipe';
@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CurrencyPipe, DiscountPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  private productService = inject(Products);

  @Input() product: IProduct = {} as IProduct;

  error = this.productService.error;

  deleteProductById(id: string): void {
    this.productService.deleteProduct(id)
  }

}
