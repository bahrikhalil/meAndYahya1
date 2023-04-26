import { TestBed } from '@angular/core/testing';

import { SwitchesPostService } from './switches-post.service';

describe('SwitchesPostService', () => {
  let service: SwitchesPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchesPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
