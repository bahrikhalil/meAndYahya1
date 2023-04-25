import { TestBed } from '@angular/core/testing';

import { FirewallsService } from './firewalls.service';

describe('FirewallsService', () => {
  let service: FirewallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirewallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
