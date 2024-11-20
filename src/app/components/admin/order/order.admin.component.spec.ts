import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdminComponent } from './order.admin.component';

describe('OrderComponent', () => {
  let component: OrderAdminComponent;
  let fixture: ComponentFixture<OrderAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderAdminComponent]
    });
    fixture = TestBed.createComponent(OrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
