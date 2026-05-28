import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const isNotConnectedGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return !inject(LoginService).isLoggedIn();
};
