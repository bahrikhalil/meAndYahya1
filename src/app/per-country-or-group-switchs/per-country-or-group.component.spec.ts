import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerCountryOrGroupComponent } from './per-country-or-group.component';

describe('PerCountryOrGroupComponent', () => {
  let component: PerCountryOrGroupComponent;
  let fixture: ComponentFixture<PerCountryOrGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerCountryOrGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerCountryOrGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
