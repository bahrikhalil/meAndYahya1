import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchesInterfacesComponent } from './switches-interfaces.component';

describe('SwitchesInterfacesComponent', () => {
  let component: SwitchesInterfacesComponent;
  let fixture: ComponentFixture<SwitchesInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchesInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchesInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
