import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductComponent } from '../product/product.component';
import { NgFor } from '@angular/common';
import { Product } from '../../model/product';
import { BgYellowDirective } from '../../directives/bg-yellow.directive';
// import { interval, map } from 'rxjs';
// import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent, NgFor, BgYellowDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartService = inject(CartService);
  public products$ = this.cartService.cart$;
  public vat$ = this.cartService.vat$;
  public totalPrice$ = this.cartService.totalPrice$;
  // public rng$ = toSignal(interval(1000).pipe(map(() => Math.random())));

  public removeFromCart(product: Product|null): void {
    if( product != null ) {
      this.cartService.removeFromCart(product);
    }
  }

  public raiseVat(): void {
    this.cartService.setVAT(this.vat$() + 5);
  }
    
}
