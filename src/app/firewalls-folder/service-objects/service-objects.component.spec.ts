import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceObjectsComponent } from './service-objects.component';

describe('ServiceObjectsComponent', () => {
  let component: ServiceObjectsComponent;
  let fixture: ComponentFixture<ServiceObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
