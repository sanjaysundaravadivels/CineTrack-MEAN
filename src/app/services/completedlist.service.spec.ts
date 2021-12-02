import { TestBed } from '@angular/core/testing';

import { CompletedlistService } from './completedlist.service';

describe('CompletedlistService', () => {
  let service: CompletedlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
