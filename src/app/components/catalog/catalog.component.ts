import { Component, inject, signal, Signal } from '@angular/core';
import { Product } from '../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../services/catalog.service';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { ProductComponent } from '../product/product.component';
import { CartService } from '../../services/cart.service';
import { SearchFilterType } from '../../model/types/SearchFilterType';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, ProductFilterPipe, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  public route = inject(ActivatedRoute);
  // public catalog = inject(CatalogService);
  public cart = inject(CartService);
  public products$ = signal<Product[]>([]);
  public platforms$ = signal<string[]>([]);

  public search: string = '';
  public platform: string = 'All';
  public minPrice: number = 0;
  public maxPrice: number = 1000;

  constructor() {
    this.route.data.subscribe(data => {
      if (data['catalog']) {
        this.products$ = data['catalog'].catalog;
        this.platforms$ = data['catalog'].platforms;
      }
    });
  }

  public getFilters(): SearchFilterType {
    return {
      search: this.search,
      platform: this.platform,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    }
  }

  public addToCart(product: Product|null): void {
    if( product != null ) {
      this.cart.addToCart(product);
    }
  }
}
