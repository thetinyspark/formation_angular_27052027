import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'name',
  standalone: true
})
export class NamePipe implements PipeTransform {
  transform(products: Product[], search:string): Product[] {

    return products;

    // return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  }

}
