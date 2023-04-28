import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchesSystemConfComponent } from './switches-system-conf.component';

describe('SwitchesSystemConfComponent', () => {
  let component: SwitchesSystemConfComponent;
  let fixture: ComponentFixture<SwitchesSystemConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchesSystemConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchesSystemConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
