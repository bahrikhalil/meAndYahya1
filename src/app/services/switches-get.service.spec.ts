import { TestBed } from '@angular/core/testing';

import { SwitchesGetService } from './switches-get.service';

describe('SwitchesGetService', () => {
  let service: SwitchesGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchesGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
