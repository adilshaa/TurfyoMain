import { TestBed } from '@angular/core/testing';

import { PosInterceptorInterceptor } from './pos-interceptor.interceptor';

describe('PosInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PosInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PosInterceptorInterceptor = TestBed.inject(PosInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
