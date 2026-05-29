import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { isNotConnectedGuard } from './is-not-connected.guard';

describe('isNotConnectedGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => 
      TestBed.runInInjectionContext(() => isNotConnectedGuard(component, currentRoute, currentState, nextState));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
