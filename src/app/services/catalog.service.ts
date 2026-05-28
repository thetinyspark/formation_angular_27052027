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

  private async loadRemoteJSON<T>(url:string, defaultValue:T):Promise<T> {
    
    try{
      return await(await fetch(url)).json() as T;
    } 
    catch(error){
      console.error(`Error loading JSON from ${url}:`, error);
      return defaultValue;
    }

  }
  public async run():Promise<void>{

    const promise = new Promise(
      async (resolve, reject) => {
        type employee = { id: number; name: string };
        type salary = { userid: number; amount: number };
        const employees = await this.loadRemoteJSON<employee[]>('./assets/employees.json', []);
        const salaries = await this.loadRemoteJSON<salary[]>('./assets/salaries.json', []);
        resolve(
            employees.map(
              employee => {
              const salary = salaries.find(salary => salary.userid === employee.id);
              return {
                id: employee.id,
                name: employee.name,
                salary: salary ? salary.amount : 0
              };
            }
          )
        );
      }
    );


    await Promise.all([promise])


    const results = await promise;
    console.log(results);
  }
}
