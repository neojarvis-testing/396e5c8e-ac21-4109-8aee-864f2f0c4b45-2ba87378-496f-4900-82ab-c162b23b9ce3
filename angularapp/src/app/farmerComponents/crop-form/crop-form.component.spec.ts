import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CropFormComponent } from './crop-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CropFormComponent', () => {
  let component: CropFormComponent;
  let fixture: ComponentFixture<CropFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropFormComponent],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_crop_form_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_crop_name_label_exists_in_crop_form_component', () => {
    const cropNameLabel = fixture.debugElement.query(By.css('label[for="cropName"]'));
    expect(cropNameLabel.nativeElement.textContent).toContain('Crop Name');
  });
});
