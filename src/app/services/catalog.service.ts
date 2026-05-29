import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', 
  useFactory: ()=>{
    // je mets ma logique qui me permet de décider si je renvoie une nouvelle instance
    // ou une déjà existante

    // if( condition1 ){
    //   alors je renvoie la même instance générale pour tout le monde
    // }
    // else{
    //   return new CatalogService();
    // }
  }
})
export class CatalogService {
  public httpClient = inject(HttpClient);
  private _products$ = signal<Product[]>([]);
  private _platforms$ = signal<string[]>([]);

  public products$ = this._products$.asReadonly();
  public platforms$ = this._platforms$.asReadonly();

  public async refresh():Promise<void>{

    let products:Product[] = [];
    try{
      products = await firstValueFrom(
        this.httpClient.get<Product[]>(environment.productApiUrl+"?random="+Math.random()),
      );
    }
    catch(error){};
    
    
    const platforms = Array.from(
      new Set(products.map((product) => product.platform)),
    );
    platforms.unshift('All');

    this._products$.set(products);
    this._platforms$.set(platforms);
  }

  public getProductById(id: number): Product | null {
    return this.products$().find((product) => product.id === id) || null;
  }
}
