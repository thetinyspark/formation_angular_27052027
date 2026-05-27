import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private _cart: Product[] = [];
  constructor() {
    this.load();
  }

  private load(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this._cart = JSON.parse(cartData);
    }
  }

  private save():void{
    localStorage.setItem('cart', JSON.stringify(this._cart));
  }

  public addToCart(product: Product) {
    this._cart.push(product);
    this.save();
  }

  public removeFromCart(product: Product) {
    const index = this._cart.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this._cart.splice(index, 1);
      this.save();
    }
  }

  public getCart(): Product[] {
    return this._cart;
  }

  public reset(): void {
    this._cart = [];
    this.save();
  }
}
