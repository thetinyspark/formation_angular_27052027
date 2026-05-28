import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private _cart: WritableSignal<Product[]> = signal([]);
  private _vat: WritableSignal<number> = signal(5);

  public cart$ = this._cart.asReadonly();
  public vat$ = this._vat.asReadonly();
  public totalPrice$ = computed(() => {
    let totalPrice = 0;
    for (const product of this._cart()) {
      totalPrice += product.price;
    }
    return totalPrice * (1 + this._vat() / 100);
  });

  constructor() {
    this.load();
  }

  private load(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this._cart.set(JSON.parse(cartData));
    }
  }

  private save():void{
    localStorage.setItem('cart', JSON.stringify(this._cart()));
  }

  public addToCart(product: Product) {
    const cart = this._cart();
    cart.push(product);
    this._cart.set(cart);
    this.save();
  }

  public removeFromCart(product: Product) {
    const cart = this._cart();
    const index = cart.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      cart.splice(index, 1);
      this._cart.set(cart);
      this.save();
    }
  }

  public setVAT(vat: number): void {
    this._vat.set(vat);
  }

  public reset(): void {
    this._cart.set([]);
    this.save();
  }
}
