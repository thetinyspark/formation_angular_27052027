import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { combineLatest, firstValueFrom, forkJoin, interval, map, Observable, ReplaySubject, Subject, take, takeLast } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public httpClient = inject(HttpClient);
  private _products$ = signal<Product[]>([]);
  private _platforms$ = signal<string[]>([]);

  public products$ = this._products$.asReadonly();
  public platforms$ = this._platforms$.asReadonly();

  // constructor() {
  //   setInterval(() => {
  //     this.refresh();
  //   }, 10000);

  //   this.refresh();
  // }

  public async refresh():Promise<void>{
    console.log('Refreshing catalog...');
    const products = await firstValueFrom(
      this.httpClient.get<Product[]>(environment.productApiUrl+"?random="+Math.random()),
    );
    
    const platforms = Array.from(
      new Set(products.map((product) => product.platform)),
    );
    platforms.unshift('All');

    this._products$.set(products);
    this._platforms$.set(platforms);
  }

  public async getProductById(id: number): Promise<Product | null> {
    return this.products$().find((product) => product.id === id) || null;
  }
}
