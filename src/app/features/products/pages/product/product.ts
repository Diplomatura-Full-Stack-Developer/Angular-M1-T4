import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatCardModule, CurrencyPipe, DiscountPipe],
  templateUrl: './product.html',
})
export class Product {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  private productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
  );

  product = computed(() => {
    const id = this.productId();
    if (!id) {
      return undefined;
    }
    return this.productService.getProductById(id);
  });


  ngOnInit(): void {
    this.productService.seedProducts();
  }

  error = this.productService.error;



}
export default Product;
