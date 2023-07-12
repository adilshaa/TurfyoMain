import { TestBed } from '@angular/core/testing';

import { ResAuthServiceService } from './res-auth-service.service';

describe('ResAuthServiceService', () => {
  let service: ResAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
