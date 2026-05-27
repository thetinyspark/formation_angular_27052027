import { Component } from '@angular/core';
import { CATALOG } from '../../mocks/product.mocks';
import { Product } from '../../model/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  public products: Product[] = [];

  ngOnInit() {
    this.products = CATALOG;
  }
}
