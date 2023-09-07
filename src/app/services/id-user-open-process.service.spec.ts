import { TestBed } from '@angular/core/testing';

import { IdUserOpenProcessService } from './id-user-open-process.service';

describe('IdUserOpenProcessService', () => {
  let service: IdUserOpenProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdUserOpenProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
