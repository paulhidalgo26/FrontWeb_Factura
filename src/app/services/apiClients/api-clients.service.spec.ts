import { TestBed } from '@angular/core/testing';

import { ApiClientsService } from './api-clients.service';

describe('ApiClientsService', () => {
  let service: ApiClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
