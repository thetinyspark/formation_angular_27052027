import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  public httpClient = inject(HttpClient);
  constructor() { }

  public getProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.productApiUrl);
  }
}
