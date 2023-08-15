import { TestBed } from '@angular/core/testing';

import { DiningSocketServiceService } from './dining-socket-service.service';

describe('DiningSocketServiceService', () => {
  let service: DiningSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiningSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
