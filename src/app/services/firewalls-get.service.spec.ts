import { TestBed } from '@angular/core/testing';

import { FirewallsGetService } from './firewalls-get.service';

describe('FirewallsGetService', () => {
  let service: FirewallsGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirewallsGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
