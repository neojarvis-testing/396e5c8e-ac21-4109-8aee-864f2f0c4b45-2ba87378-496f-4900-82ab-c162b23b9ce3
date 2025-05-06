import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerViewAgrochemicalComponent } from './farmer-view-agrochemical.component';

describe('FarmerViewAgrochemicalComponent', () => {
  let component: FarmerViewAgrochemicalComponent;
  let fixture: ComponentFixture<FarmerViewAgrochemicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerViewAgrochemicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerViewAgrochemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
