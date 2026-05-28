import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { isNotConnectedGuard } from './is-not-connected.guard';

describe('isNotConnectedGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
