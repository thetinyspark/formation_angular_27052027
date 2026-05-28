import { ResolveFn } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { inject, Signal } from '@angular/core';
import { Product } from '../model/product';

export const catalogResolver: ResolveFn<{ 
  catalog: Signal<Product[]>; 
  platforms: Signal<string[]> }
  > = async (route, state) => {
  const catalogService = inject(CatalogService); 
  await catalogService.refresh();
  return { catalog: catalogService.products$, platforms: catalogService.platforms$ };
};
