import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCompletedComponent } from './sale-completed.component';

describe('SaleCompletedComponent', () => {
  let component: SaleCompletedComponent;
  let fixture: ComponentFixture<SaleCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
