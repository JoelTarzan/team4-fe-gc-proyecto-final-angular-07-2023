import { TestBed } from '@angular/core/testing';

import { CandidaturaService } from './candidatura.service';

describe('CandidaturaService', () => {
  let service: CandidaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
