import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { LogMethodCall } from '../decorators/LogMethodCall';
import { RegisterClass } from '../decorators/RegisterClass';

@Injectable({
  providedIn: 'root',
})
@RegisterClass({toto:'titi', tata:'tutu'})
export class CartService {
  
  private _cart: WritableSignal<Product[]> = signal([]);
  private _vat: WritableSignal<number> = signal(5);

  public cart$ = this._cart.asReadonly();
  public vat$ = this._vat.asReadonly();
  public http = inject(HttpClient);

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

  @LogMethodCall
  private async load(): Promise<void> {
    const cartData = await firstValueFrom(this.http.get<Product[]>(environment.cartApiUrl))
    this._cart.set(cartData);
  }

  private save():void{
    this.http.post<Product[]>(environment.cartApiUrl, JSON.stringify(this._cart()));
  }

  @LogMethodCall
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
