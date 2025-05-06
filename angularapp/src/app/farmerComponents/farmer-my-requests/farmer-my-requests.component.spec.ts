import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMyRequestsComponent } from './farmer-my-requests.component';

describe('FarmerMyRequestsComponent', () => {
  let component: FarmerMyRequestsComponent;
  let fixture: ComponentFixture<FarmerMyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerMyRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerMyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
