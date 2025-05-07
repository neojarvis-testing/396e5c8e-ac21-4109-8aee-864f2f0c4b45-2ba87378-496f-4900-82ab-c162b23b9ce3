import { TestBed } from '@angular/core/testing';
import { CropService } from './crop.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CropService', () => {
  let service: CropService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CropService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_should_create_crop_service', () => {
    expect(service).toBeTruthy();
  });
});
