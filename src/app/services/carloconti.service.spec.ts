import { TestBed } from '@angular/core/testing';

import { CarlocontiService } from './carloconti.service';

describe('CarlocontiService', () => {
  let service: CarlocontiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarlocontiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
