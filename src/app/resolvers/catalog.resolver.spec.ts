import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { catalogResolver } from './catalog.resolver';
import { Product } from '../model/product';
import { Signal } from '@angular/core';

describe('catalogResolver', () => {
  const executeResolver: ResolveFn<
  { 
    catalog: Signal<Product[]>; 
    platforms: Signal<string[]> 
  }> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => catalogResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
