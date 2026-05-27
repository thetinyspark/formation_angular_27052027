import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';
import { NamePipe } from './name.pipe';
import { PlatformPipe } from './platform.pipe';
import { PricePipe } from './price.pipe';
import { SearchFilterType } from '../model/types/SearchFilterType';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], filters: SearchFilterType): Product[] {
    
    let result = new NamePipe().transform(products, filters.search);
    result = new PlatformPipe().transform(result, filters.platform);
    result = new PricePipe().transform(result, filters.minPrice, filters.maxPrice);
    return result;
  }

}
