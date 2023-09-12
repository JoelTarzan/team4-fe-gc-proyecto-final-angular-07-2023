import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const rrhhOrAdminGuard: CanActivateFn = (route, state) => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);
  
  if (tokenStorageService.getRole() == 'rrhh' || tokenStorageService.getRole() == 'admin') {

    return true
  }

  router.navigate([""]);
  return false;
};