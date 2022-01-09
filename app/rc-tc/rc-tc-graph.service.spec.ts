import { TestBed } from '@angular/core/testing';

import { RcTcGraphService } from './rc-tc-graph.service';

describe('RcTcGraphService', () => {
  let service: RcTcGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcTcGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
