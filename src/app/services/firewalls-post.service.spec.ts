import { TestBed } from '@angular/core/testing';

import { FirewallsPostService } from './firewalls-post.service';

describe('FirewallsPostService', () => {
  let service: FirewallsPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirewallsPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
