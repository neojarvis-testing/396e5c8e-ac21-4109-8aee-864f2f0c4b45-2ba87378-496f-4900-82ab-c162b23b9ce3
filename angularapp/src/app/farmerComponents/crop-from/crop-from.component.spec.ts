import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropFromComponent } from './crop-from.component';

describe('CropFromComponent', () => {
  let component: CropFromComponent;
  let fixture: ComponentFixture<CropFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
