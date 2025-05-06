import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrochemicalFormComponent } from './agrochemical-form.component';

describe('AgrochemicalFormComponent', () => {
  let component: AgrochemicalFormComponent;
  let fixture: ComponentFixture<AgrochemicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrochemicalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrochemicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
