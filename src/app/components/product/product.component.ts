import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input()
  public product:Product|null = null;

  @Input()
  public canBuy: boolean = false;

  @Input()
  public canRemove: boolean = false;

  @Input()
  public detailed: boolean = false;

  @Output()
  public onAddToCart: EventEmitter<Product|null> = new EventEmitter();

  @Output()
  public onRemoveFromCart: EventEmitter<Product|null> = new EventEmitter();

  public addToCart(): void {
    this.onAddToCart.emit(this.product);
  }

  public removeFromCart(): void {
    this.onRemoveFromCart.emit(this.product);
  }
}
