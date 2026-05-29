import { ResolveFn } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { inject, Signal } from '@angular/core';
import { Product } from '../model/product';
import { PreloaderService } from '../services/preloader.service';

export const catalogResolver: ResolveFn<{ 
  catalog: Signal<Product[]>; 
  platforms: Signal<string[]> }
  > = async (route, state) => {
  const catalogService = inject(CatalogService); 
  const preloaderService = inject(PreloaderService);
  preloaderService.isLoading$.set(true);
  await catalogService.refresh();
  preloaderService.isLoading$.set(false);
  return { catalog: catalogService.products$, platforms: catalogService.platforms$ };
};
