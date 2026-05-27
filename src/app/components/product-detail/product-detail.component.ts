import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  public route = inject(ActivatedRoute);

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('Product ID:', params.get('id'));
    });
  }
}
