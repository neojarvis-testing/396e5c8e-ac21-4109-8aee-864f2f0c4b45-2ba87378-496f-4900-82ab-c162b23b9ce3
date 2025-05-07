import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewAgrochemicalComponent } from './view-agrochemical.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ViewAgrochemicalComponent', () => {
  let component: ViewAgrochemicalComponent;
  let fixture: ComponentFixture<ViewAgrochemicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgrochemicalComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgrochemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_view_agrochemical_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_agrochemicals_exists_in_view_agrochemical_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Agrochemicals');
  });

  fit('Frontend_should_check_if_no_records_found_message_is_displayed_in_view_agrochemical_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Oops! No records found');
  });
});
