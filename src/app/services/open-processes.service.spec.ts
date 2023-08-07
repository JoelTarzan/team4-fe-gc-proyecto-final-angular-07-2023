import { TestBed } from '@angular/core/testing';

import { OpenProcessesService } from './open-processes.service';

describe('OpenProcessesService', () => {
  let service: OpenProcessesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenProcessesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
