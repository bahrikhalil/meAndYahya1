import { TestBed } from '@angular/core/testing';

import { CreateReportSwitchesService } from './create-report-switches.service';

describe('CreateReportSwitchesService', () => {
  let service: CreateReportSwitchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReportSwitchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
