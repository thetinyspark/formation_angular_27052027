import { Component, computed, effect, inject, signal } from '@angular/core';
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

  public vat = signal<number>(0);
  
  public totalPrice = computed(() => {
    let totalPrice = 0;
    for (const product of this.products) {
      totalPrice += product.price;
    }
    return totalPrice * (1 + this.vat() / 100);
  });

  constructor() { 
    effect(() => {
      console.log('VAT changed:', this.vat());
    });
  }

  public ngOnInit() {
    this.products = this.cartService.getCart();
  }
  public removeFromCart(product: Product|null): void {
    if( product != null ) {
      this.cartService.removeFromCart(product);
      this.products = this.cartService.getCart();
    }
  }

  public raiseVat(): void {
    this.vat.set(this.vat() + 5);
  }
    
}
