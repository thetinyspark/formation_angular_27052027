import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { CATALOG } from '../../mocks/product.mocks';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { signal } from '@angular/core';
import { Product } from '../../model/product';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { catalogInterceptor } from '../../interceptors/catalog.interceptor';

fdescribe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let cartService = new CartService();
  let catalogMock = CATALOG; 
  let platformsMock = CATALOG.map( p=>p.platform);
  platformsMock.unshift("All");

  let route = {
    data: of(
      {
        "catalog": {
          "catalog": signal<Product[]>(catalogMock), 
          "platforms": signal<string[]>(platformsMock)
        }
      }
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent], 
      providers: [
        {provide: CartService, useValue: cartService},
        {provide: ActivatedRoute, useValue: route},
        provideHttpClient(withInterceptors([catalogInterceptor])),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from activated route', () => {
    fixture.detectChanges();
    expect(component.products$()).toEqual(catalogMock);
    expect(component.platforms$()).toEqual(platformsMock);
  });

  it('should render all products', () => {
    fixture.detectChanges();
    const compiledElement = fixture.nativeElement as HTMLElement;
    const renderedProducts = Array.from( compiledElement.querySelectorAll(".product"));

    expect(renderedProducts.length).toEqual(catalogMock.length);
  });

  // ici on a d'avantage un test d'intégration de ProductComponent qui 
  // est utilisé au sein du CatalogComponent
  it('should render all products with a certain name', () => {
    const search = catalogMock[0].name;
    component.search = search;
    fixture.detectChanges();
    const compiledElement = fixture.nativeElement as HTMLElement;
    const renderedProducts = Array.from( compiledElement.querySelectorAll(".product"));
    expect(renderedProducts.length).toBeGreaterThanOrEqual(1);
  });
});
