import { TestBed } from '@angular/core/testing';

import { PosSocketServiceService } from './pos-socket-service.service';

describe('PosSocketServiceService', () => {
  let service: PosSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
