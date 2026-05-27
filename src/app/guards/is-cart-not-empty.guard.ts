import { CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject } from '@angular/core';

export const isCartNotEmptyGuard: CanActivateFn = (route, state) => {
  const cartService: CartService = inject(CartService);
  const cartItems = cartService.getCart();
  return cartItems.length > 0;
};
