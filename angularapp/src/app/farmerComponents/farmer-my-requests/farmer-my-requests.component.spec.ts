import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FarmerMyRequestsComponent } from './farmer-my-requests.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FarmerMyRequestsComponent', () => {
  let component: FarmerMyRequestsComponent;
  let fixture: ComponentFixture<FarmerMyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerMyRequestsComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerMyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_farmer_my_requests_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_my_requests_exists_in_farmer_my_requests_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My Requests');
  });

  fit('Frontend_should_check_if_no_records_found_message_is_displayed_in_farmer_my_requests_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Oops! No records Found');
  });
});
