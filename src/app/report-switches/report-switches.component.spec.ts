import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSwitchesComponent } from './report-switches.component';

describe('ReportSwitchesComponent', () => {
  let component: ReportSwitchesComponent;
  let fixture: ComponentFixture<ReportSwitchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSwitchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSwitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
