import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerViewRequestsComponent } from './seller-view-requests.component';

describe('SellerViewRequestsComponent', () => {
  let component: SellerViewRequestsComponent;
  let fixture: ComponentFixture<SellerViewRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerViewRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerViewRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
