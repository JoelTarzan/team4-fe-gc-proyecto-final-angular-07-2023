import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);

  if (tokenStorageService.getRole() == 'admin') {

    return true
  }

  router.navigate([""]);
  return false;
};