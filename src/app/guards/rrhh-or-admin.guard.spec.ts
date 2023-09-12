import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rrhhOrAdminGuard } from './rrhh-or-admin.guard';

describe('rrhhOrAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rrhhOrAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
