import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).isLoggedIn();
};
