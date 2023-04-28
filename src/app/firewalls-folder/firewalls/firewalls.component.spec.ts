import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallsComponent } from './firewalls.component';

describe('FirewallsComponent', () => {
  let component: FirewallsComponent;
  let fixture: ComponentFixture<FirewallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirewallsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirewallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
