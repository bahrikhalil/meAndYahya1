import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchesVlansComponent } from './switches-vlans.component';

describe('SwitchesVlansComponent', () => {
  let component: SwitchesVlansComponent;
  let fixture: ComponentFixture<SwitchesVlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchesVlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchesVlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
