import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgrochemicalFormComponent } from './agrochemical-form.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AgrochemicalFormComponent', () => {
  let component: AgrochemicalFormComponent;
  let fixture: ComponentFixture<AgrochemicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrochemicalFormComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrochemicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_agrochemical_form_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_name_label_exists_agrochemical_form_component', () => {
    const nameLabel = fixture.debugElement.query(By.css('label[for="name"]'));
    expect(nameLabel.nativeElement.textContent).toContain('Name');
  });

});
