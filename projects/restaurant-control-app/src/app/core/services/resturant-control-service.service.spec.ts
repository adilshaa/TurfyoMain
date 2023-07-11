import { TestBed } from '@angular/core/testing';

import { ResturantControlServiceService } from './resturant-control-service.service';

describe('ResturantControlServiceService', () => {
  let service: ResturantControlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResturantControlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
