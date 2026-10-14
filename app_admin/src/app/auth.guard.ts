import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from './authentication';

// prevent unauthenticated access to administrator pages
export const authGuard: CanActivateFn = () => {
  const authentication = inject(Authentication);
  const router = inject(Router);

  // allow access when a valid, unexpired token exists
  if (authentication.isLoggedIn()) {
    return true;
  }

  // redirect unauthenticated users to login
  return router.createUrlTree(['/login']);
};