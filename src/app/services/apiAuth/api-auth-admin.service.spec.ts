import { TestBed } from '@angular/core/testing';

import { ApiAuthAdminService } from './api-auth-admin.service';

describe('ApiAuthAdminService', () => {
  let service: ApiAuthAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
