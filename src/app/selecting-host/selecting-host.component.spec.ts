import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectingHostComponent } from './selecting-host.component';

describe('SelectingHostComponent', () => {
  let component: SelectingHostComponent;
  let fixture: ComponentFixture<SelectingHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectingHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectingHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
