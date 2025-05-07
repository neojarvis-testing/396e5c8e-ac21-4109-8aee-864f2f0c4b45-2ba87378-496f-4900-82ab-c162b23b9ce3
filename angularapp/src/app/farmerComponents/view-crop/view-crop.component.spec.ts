import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewCropComponent } from './view-crop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ViewCropComponent', () => {
  let component: ViewCropComponent;
  let fixture: ComponentFixture<ViewCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCropComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule,HttpClientTestingModule ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_view_crop_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_crops_exists_in_view_crop_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Crops');
  });

  fit('Frontend_should_check_if_no_records_found_message_is_displayed_in_view_crop_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Oops! No records found');
  });
});
