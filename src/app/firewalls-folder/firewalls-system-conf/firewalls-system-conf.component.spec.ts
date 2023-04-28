import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallsSystemConfComponent } from './firewalls-system-conf.component';

describe('FirewallsSystemConfComponent', () => {
  let component: FirewallsSystemConfComponent;
  let fixture: ComponentFixture<FirewallsSystemConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirewallsSystemConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirewallsSystemConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
