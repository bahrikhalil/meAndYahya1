import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressObjectsComponent } from './address-objects.component';

describe('AddressObjectsComponent', () => {
  let component: AddressObjectsComponent;
  let fixture: ComponentFixture<AddressObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
