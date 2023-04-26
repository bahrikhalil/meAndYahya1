import { TestBed } from '@angular/core/testing';

import { CreateReportFirewallsService } from './create-report-firewalls.service';

describe('CreateReportFirewallsService', () => {
  let service: CreateReportFirewallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReportFirewallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
