import { TestBed } from '@angular/core/testing';

import { SuperAdminInterceptorInterceptor } from './super-admin-interceptor.interceptor';

describe('SuperAdminInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SuperAdminInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SuperAdminInterceptorInterceptor = TestBed.inject(SuperAdminInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
