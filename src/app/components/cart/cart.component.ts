import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductComponent } from '../product/product.component';
import { NgFor } from '@angular/common';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartService = inject(CartService);
  public products:Product[] = [];

  public ngOnInit() {
    this.products = this.cartService.getCart();
  }
  public removeFromCart(product: Product|null): void {
    if( product != null ) {
      this.cartService.removeFromCart(product);
      this.products = this.cartService.getCart();
    }
  }
}
