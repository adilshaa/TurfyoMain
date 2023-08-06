import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { posGuardGuard } from './pos-guard.guard';

describe('posGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => posGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
