import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFirewallsComponent } from './report-firewalls.component';

describe('ReportFirewallsComponent', () => {
  let component: ReportFirewallsComponent;
  let fixture: ComponentFixture<ReportFirewallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFirewallsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFirewallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
