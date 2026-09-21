import { Component, inject } from '@angular/core';
import { ProductCard } from '../ui/product-card/product-card';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink, ProductCard],
  templateUrl: './products-list.html',
})
export class ProductsList implements OnInit {

  private productService = inject(ProductService);

  error = this.productService.error;

  products = computed(() =>
    this.productService.products().filter((p) => !p.deleted),
  );

  ngOnInit(): void {
    this.productService.seedProducts();
  }
}

export default ProductsList;
