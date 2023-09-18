import { TestBed } from '@angular/core/testing';

import { SkillUserService } from './skill-user.service';

describe('SkillUserService', () => {
  let service: SkillUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
