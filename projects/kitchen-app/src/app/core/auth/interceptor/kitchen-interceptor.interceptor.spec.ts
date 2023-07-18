import { TestBed } from '@angular/core/testing';

import { KitchenInterceptorInterceptor } from './kitchen-interceptor.interceptor';

describe('KitchenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      KitchenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: KitchenInterceptorInterceptor = TestBed.inject(KitchenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
