import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CATALOG } from '../mocks/product.mocks';

fdescribe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to cart and be able to retrieve it', () => {
    service.addToCart(CATALOG[0]); 
    expect(service.cart$()).toEqual([CATALOG[0]]);
  });

  it('should be able to reset the cart', () => {
    service.addToCart(CATALOG[0]); 
    service.reset();
    expect(service.cart$()).toEqual([]);
  });

  it('should be able to remove a product from the cart', () => {
    service.addToCart(CATALOG[0]); 
    service.addToCart(CATALOG[1]); 
    service.addToCart(CATALOG[2]); 
    service.removeFromCart(CATALOG[1]);
    expect(service.cart$()).toEqual([CATALOG[0], CATALOG[2]]);
  });

  it('should be able to set VAT and retrieve VAT', () => {
    const vat = Math.round(Math.random() * 100);
    service.setVAT(vat); 
    expect(service.vat$()).toEqual(vat);
  });
});
