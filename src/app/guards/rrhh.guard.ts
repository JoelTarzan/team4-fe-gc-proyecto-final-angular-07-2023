import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const rrhhGuard: CanActivateFn = (route, state) => {

  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);
  
  if (tokenStorageService.getRole() == 'rrhh') {

    return true
  }

  router.navigate([""]);
  return false;
};