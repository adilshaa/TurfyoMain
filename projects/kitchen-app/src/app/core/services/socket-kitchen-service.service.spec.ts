import { TestBed } from '@angular/core/testing';

import { SocketKitchenServiceService } from './socket-kitchen-service.service';

describe('SocketKitchenServiceService', () => {
  let service: SocketKitchenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketKitchenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
