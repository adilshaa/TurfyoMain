import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { resAuthGuardsGuard } from './res-auth-guards.guard';

describe('resAuthGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => resAuthGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
