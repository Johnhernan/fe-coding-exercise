import { TestBed } from '@angular/core/testing';

import { CovidCasesApiService } from './covid-statistics.api.service';

describe('CovidStatisticsApiService', () => {
  let service: CovidCasesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidCasesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
