import { TestBed } from '@angular/core/testing';

import { ApiSaleDetailsService } from './api-sale-details.service';

describe('ApiSaleDetailsService', () => {
  let service: ApiSaleDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSaleDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
