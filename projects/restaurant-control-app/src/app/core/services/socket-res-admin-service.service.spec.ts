import { TestBed } from '@angular/core/testing';

import { SocketResAdminServiceService } from './socket-res-admin-service.service';

describe('SocketResAdminServiceService', () => {
  let service: SocketResAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketResAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
