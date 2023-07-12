import { TestBed } from '@angular/core/testing';

import { ResAdminInterseptorInterceptor } from './res-admin-interseptor.interceptor';

describe('ResAdminInterseptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResAdminInterseptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResAdminInterseptorInterceptor = TestBed.inject(ResAdminInterseptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
