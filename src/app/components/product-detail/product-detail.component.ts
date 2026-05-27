import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  public route = inject(ActivatedRoute);
  public catalog = inject(CatalogService);
  public cart = inject(CartService);
  public product:Product|null = null;

  public async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.product = await this.catalog.getProductById(parseInt(id));
      }
    });
  }

  public addToCart(product: Product|null): void {
    if( product != null ) 
      this.cart.addToCart(product);
  }
}
