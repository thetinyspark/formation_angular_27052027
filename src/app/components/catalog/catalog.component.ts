import { Component, inject } from '@angular/core';
import { CATALOG } from '../../mocks/product.mocks';
import { Product } from '../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../services/catalog.service';
import { FormsModule } from '@angular/forms';
import { NamePipe } from '../../pipes/name.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, NamePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  public catalog = inject(CatalogService);
  public products: Product[] = [];
  public search: string = '';
  public platform: string = '';

  public async ngOnInit() {
    this.products = await this.catalog.getProducts();
  }

  public getPlatforms():string[]{
    return this.catalog.getPlatforms();
  }
}
