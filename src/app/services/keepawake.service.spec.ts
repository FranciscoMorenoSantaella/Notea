import { TestBed } from '@angular/core/testing';

import { KeepawakeService } from './keepawake.service';

describe('KeepawakeService', () => {
  let service: KeepawakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepawakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
