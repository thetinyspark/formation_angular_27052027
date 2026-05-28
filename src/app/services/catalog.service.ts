import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
    const waitFor4Seconds = new Promise<string>(
      (resolve, reject)=>{
        setTimeout(() => {
          resolve("coucou");
        }, 4000);
      }
    );

    // Une promesse est un objet qui représente une opération asynchrone 
    // et qui peut être dans l'un des trois états suivants : en attente (pending), 
    // résolue (fulfilled) ou rejetée (rejected).
    // C'est une façon standardisée de gérer les opérations asynchrones en Javascript. 

    // une promesse ne peut être résolue ou rejetée qu'une seule fois. 
    // Une fois qu'une promesse est résolue ou rejetée, son état ne peut plus changer.


    console.log("le traitement commence");
    waitFor4Seconds.then(
      (result)=>{
        console.log("4 secondes se sont écoulées", result);
      }
    ).catch(
      (error)=>{
        console.error("une erreur s'est produite : ", error);
      }
    ).finally(
      ()=>{
        console.log("le traitement est terminé");
      }
    );

  }
}
