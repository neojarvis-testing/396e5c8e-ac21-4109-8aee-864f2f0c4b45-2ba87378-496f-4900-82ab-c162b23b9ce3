import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SellerViewRequestsComponent } from './seller-view-requests.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SellerViewRequestsComponent', () => {
  let component: SellerViewRequestsComponent;
  let fixture: ComponentFixture<SellerViewRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerViewRequestsComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerViewRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_seller_view_requests_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_chemical_requests_for_approval_exists_in_seller_view_requests_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Chemical Requests for Approval');
  });

  fit('Frontend_should_check_if_no_records_found_message_is_displayed_in_seller_view_requests_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Oops! No records Found');
  });
});
