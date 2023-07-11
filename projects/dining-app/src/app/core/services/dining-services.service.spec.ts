import { TestBed } from '@angular/core/testing';

import { DiningServicesService } from './dining-services.service';

describe('DiningServicesService', () => {
  let service: DiningServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiningServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
