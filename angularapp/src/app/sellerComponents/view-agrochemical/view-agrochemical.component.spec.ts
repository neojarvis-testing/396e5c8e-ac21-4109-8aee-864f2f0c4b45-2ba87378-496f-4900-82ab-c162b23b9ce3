import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgrochemicalComponent } from './view-agrochemical.component';

describe('ViewAgrochemicalComponent', () => {
  let component: ViewAgrochemicalComponent;
  let fixture: ComponentFixture<ViewAgrochemicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgrochemicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgrochemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
