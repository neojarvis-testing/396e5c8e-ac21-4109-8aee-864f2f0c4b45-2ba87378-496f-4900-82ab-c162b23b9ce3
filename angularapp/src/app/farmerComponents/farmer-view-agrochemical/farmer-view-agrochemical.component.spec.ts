import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FarmerViewAgrochemicalComponent } from './farmer-view-agrochemical.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FarmerViewAgrochemicalComponent', () => {
  let component: FarmerViewAgrochemicalComponent;
  let fixture: ComponentFixture<FarmerViewAgrochemicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerViewAgrochemicalComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule,ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerViewAgrochemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_farmer_view_agrochemical_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_available_agrochemicals_exists_in_farmer_view_agrochemical_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Available Agrochemicals');
  });
});
