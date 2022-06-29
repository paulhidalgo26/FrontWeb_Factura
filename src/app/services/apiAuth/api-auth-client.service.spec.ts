import { TestBed } from '@angular/core/testing';
import { ApiAuthClientService } from './api-auth-client.service';


describe('ApiAuthService', () => {
  let service: ApiAuthClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
