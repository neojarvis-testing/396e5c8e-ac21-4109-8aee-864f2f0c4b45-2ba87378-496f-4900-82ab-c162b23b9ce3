import { TestBed } from '@angular/core/testing';

import { AgrochemicalService } from './agrochemical.service';

describe('AgrochemicalService', () => {
  let service: AgrochemicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgrochemicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
