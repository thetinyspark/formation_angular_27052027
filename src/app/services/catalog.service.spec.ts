import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { CATALOG } from '../mocks/product.mocks';
import { of } from 'rxjs';

fdescribe('CatalogService', () => {


  class FakeHttpClient {
    get<T>(url: string) {
      return of(CATALOG);
    }
  }

  let service: CatalogService;
  let fakeHttpClient: FakeHttpClient = new FakeHttpClient();

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          {provide: HttpClient, useValue: fakeHttpClient}, 

          // on bouchonne les accès réseaux et BDD pour les tests
          // en l'absence d'interceptor, c'est une mauvaise idée 
          // que de dépendre de l'appel à une API distance. 

          // provideHttpClient(), 
        ]
      }
    );
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products after refresh', async () => {
    await service.refresh();
    expect(service.products$()).toEqual(CATALOG);
  });

  it('should return all platforms after refresh', async () => {
    await service.refresh();
    const expected = CATALOG.map( p=>p.platform); 
    expected.unshift('All');
    expect(service.platforms$()).toEqual(expected);
  });

  it('should return a product by its id if exists', async () => {
    await service.refresh();
    const index = Math.round( Math.random() *CATALOG.length);
    const expected = CATALOG[index] || null;
    expect(service.getProductById(expected?.id)).toEqual(expected);
  });

  it('should handle a failure properly', async () => {

    const spy = spyOn(fakeHttpClient, 'get').and.callFake( 
      ()=>{ 
        throw new Error("impossible");
      }
    );

    await service.refresh();
    expect(service.products$().length).toEqual(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
