import { TestBed } from '@angular/core/testing';

import { ApplicationsService } from './applications.service';

describe('ApplicationsServiceService', () => {
  let service: ApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
