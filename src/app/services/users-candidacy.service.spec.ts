import { TestBed } from '@angular/core/testing';

import { UsersCandidacyService } from './users-candidacy.service';

describe('UsersCandidacyService', () => {
  let service: UsersCandidacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersCandidacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
