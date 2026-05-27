import { Component, inject } from '@angular/core';
import { CATALOG } from '../../mocks/product.mocks';
import { Product } from '../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  public catalog = inject(CatalogService);
  public products: Product[] = [];

  ngOnInit() {
    this.catalog.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
