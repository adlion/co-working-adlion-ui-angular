import { TestBed } from '@angular/core/testing';

import { QueryEncoderService } from './query-encoder.service';

describe('QueryEncoderService', () => {
  let service: QueryEncoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryEncoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
