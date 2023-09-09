import { TestBed } from '@angular/core/testing';

import { ApplicationsServiceService } from './applications.service.service';

describe('ApplicationsServiceService', () => {
  let service: ApplicationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
