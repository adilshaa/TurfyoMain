import { TestBed } from '@angular/core/testing';

import { DiningInterceptorInterceptor } from './dining-interceptor.interceptor';

describe('DiningInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DiningInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DiningInterceptorInterceptor = TestBed.inject(DiningInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
