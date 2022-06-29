import { ComponentFixture, TestBed } from '@angular/core/testing';

import { adminLoginComponent } from './admin-login.component';

describe('LoginComponent', () => {
  let component: adminLoginComponent;
  let fixture: ComponentFixture<adminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ adminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(adminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
