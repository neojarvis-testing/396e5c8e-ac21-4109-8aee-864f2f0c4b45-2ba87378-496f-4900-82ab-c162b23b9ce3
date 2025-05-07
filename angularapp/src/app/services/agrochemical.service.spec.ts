import { TestBed } from '@angular/core/testing';
import { AgrochemicalService } from './agrochemical.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AgrochemicalService', () => {
  let service: AgrochemicalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AgrochemicalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_should_create_agrochemical_service', () => {
    expect(service).toBeTruthy();
  });
});
