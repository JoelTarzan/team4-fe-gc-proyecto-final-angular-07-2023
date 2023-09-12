import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rrhhGuard } from './rrhh.guard';

describe('rrhhGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rrhhGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
