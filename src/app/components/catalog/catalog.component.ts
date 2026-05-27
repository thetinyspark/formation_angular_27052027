import { Component, inject } from '@angular/core';
import { Product } from '../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../services/catalog.service';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, ProductFilterPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  public catalog = inject(CatalogService);
  public products: Product[] = [];
  public search: string = '';
  public platform: string = 'All';
  public minPrice: number = 0;
  public maxPrice: number = 1000;

  public async ngOnInit() {
    this.products = await this.catalog.getProducts();
  }

  public getPlatforms():string[]{
    return this.catalog.getPlatforms();
  }

  public getFilters(): any {
    return {
      search: this.search,
      platform: this.platform,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    }
  }
}
