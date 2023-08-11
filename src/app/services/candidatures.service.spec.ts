import { TestBed } from '@angular/core/testing';

import { CandidaturesService } from './candidatures.service';

describe('CandidaturesService', () => {
  let service: CandidaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
