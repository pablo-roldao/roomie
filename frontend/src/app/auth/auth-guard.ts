import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const requiredRole = route.data?.['role'];

  if(!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if(requiredRole && !authService.hasRole(requiredRole)) {
    return router.createUrlTree(['/unauthorized']);
  }
  return true;
};
