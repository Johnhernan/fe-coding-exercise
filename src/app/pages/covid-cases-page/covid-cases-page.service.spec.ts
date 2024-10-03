import { TestBed } from '@angular/core/testing';

import { CovidCasesPageService } from './covid-cases-page.service';

describe('CovidCasesPageService', () => {
  let service: CovidCasesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidCasesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
