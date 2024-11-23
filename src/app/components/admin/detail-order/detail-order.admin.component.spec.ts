import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderAdminComponent } from './detail-order.admin.component';

describe('DetailOrderComponent', () => {
  let component: DetailOrderAdminComponent;
  let fixture: ComponentFixture<DetailOrderAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOrderAdminComponent]
    });
    fixture = TestBed.createComponent(DetailOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
