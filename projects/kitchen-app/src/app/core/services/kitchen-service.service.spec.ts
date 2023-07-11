import { TestBed } from '@angular/core/testing';

import { KitchenServiceService } from './kitchen-service.service';

describe('KitchenServiceService', () => {
  let service: KitchenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
