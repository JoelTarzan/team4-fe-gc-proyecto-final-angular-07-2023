import { TestBed } from '@angular/core/testing';

import { SkillCandidatureService } from './skill-candidature.service';

describe('SkillCandidatureService', () => {
  let service: SkillCandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillCandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
