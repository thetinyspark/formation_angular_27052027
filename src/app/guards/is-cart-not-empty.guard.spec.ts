import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isCartNotEmptyGuard } from './is-cart-not-empty.guard';

describe('isCartNotEmptyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isCartNotEmptyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
