import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, forkJoin, map, Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  public httpClient = inject(HttpClient);
  private _products: Product[] = [];

  public async getProducts(): Promise<Product[]> {
    this._products = await firstValueFrom(
      this.httpClient.get<Product[]>(environment.productApiUrl),
    );
    return this._products;
  }

  public getPlatforms(): string[] {
    // le set n'admet aucun doublon et on construit un tableau à partir de ce set
    // le set a été initialisé à partir d'un tableau de plateformes extraites du catalogue de produits
    const results = Array.from(
      new Set(this._products.map((product) => product.platform)),
    );
    results.unshift('All');
    return results;
  }

  public async getProductById(id: number): Promise<Product | null> {
    this._products = await this.getProducts();
    return this._products.find((product) => product.id === id) || null;
  }

  public get<T>(url: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          subscriber.next(data as T);
          subscriber.complete();
        })
        .catch((error) => subscriber.error(error));
    });
  }

  public getEmployeesWithSalaries(): Observable<{ id: number; name: string; salary: number }[]> {
    type employee = {
      id: number;
      name: string;
    };
    type salary = {
      userid: number;
      amount: number;
    };

    // forkjoin attend que tous les observables passés en argument aient émis 
    // une valeur et se soient complétés pour émettre un tableau de résultats

    return forkJoin(
      {
        employees: this.get<employee[]>('./assets/employees.json'),
        salaries: this.get<salary[]>('./assets/salaries.json'),
      }
    ).pipe(
      map((data:{ employees: employee[]; salaries: salary[] }) => {
        return data.employees.map((employee) => {
          const salary = data.salaries.find(
            (salary) => salary.userid === employee.id,
          );
          return {
            id: employee.id,
            name: employee.name,
            salary: salary ? salary.amount : 0,
          };
        });
      }),
    );
  }

  public async run(): Promise<void> {
    this.getEmployeesWithSalaries().subscribe(console.log);

    // subscription.unsubscribe(); // pour se désabonner de l'observable et ne plus recevoir de notifications
  }
}
