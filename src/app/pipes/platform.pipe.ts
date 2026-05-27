import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'platform',
  standalone: true
})
export class PlatformPipe implements PipeTransform {

  transform(products: Product[], platform: string): Product[] {
    if( platform === "All" ) {
      return products;
    }
    return products.filter((product) => product.platform === platform);
  }

}
