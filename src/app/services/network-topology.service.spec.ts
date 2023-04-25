import { TestBed } from '@angular/core/testing';

import { NetworkTopologyService } from './network-topology.service';

describe('NetworkTopologyService', () => {
  let service: NetworkTopologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkTopologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
