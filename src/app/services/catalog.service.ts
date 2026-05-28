import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public httpClient = inject(HttpClient);
  private _products: Product[] = [];

  public async getProducts():Promise<Product[]> {
    this._products = await firstValueFrom(this.httpClient.get<Product[]>(environment.productApiUrl));
    return this._products;
  }

  public getPlatforms():string[]{
    // le set n'admet aucun doublon et on construit un tableau à partir de ce set
    // le set a été initialisé à partir d'un tableau de plateformes extraites du catalogue de produits
    const results = Array.from( new Set( this._products.map((product) => product.platform) ) );
    results.unshift("All");
    return results;
  }

  public async getProductById(id: number): Promise<Product|null> {
    this._products = await this.getProducts();
    return this._products.find(product => product.id === id) || null;
  }

  public async run():Promise<void>{

    // of est un opérateur de création d'observable qui émet les valeurs passées en argument
    // const $obs1 = of(1,2,3); 
    // $obs1.subscribe(
    //   (value)  =>{
    //     console.log("value", value);
    //   }
    // );


    const $obs2 = new Observable<number>(
      (subscriber) => {

        setTimeout(() => {
          subscriber.next(1);
        }, 1000);

        setTimeout(() => {
          subscriber.next(2);
        }, 2000);

        setTimeout(() => {
          subscriber.next(3);
          subscriber.complete();
          subscriber.next(4); // cette valeur ne sera pas émise car le subscriber est déjà complété
        }, 3000);

        return ()=>{
          // cette fonction sera appelée lorsque le subscriber se désabonnera de l'observable
          console.log("désabonnement de l'observable"); 
        }
      }
    );

    const subscription = $obs2.subscribe(
      {
        next: (value)  =>{
          console.log("value", value);
        },
        error: (error) => {
          console.error("error", error);
        },
        complete: () => {
          console.log("complete");
        }
      }
    );

    // subscription.unsubscribe(); // pour se désabonner de l'observable et ne plus recevoir de notifications

  }
}
