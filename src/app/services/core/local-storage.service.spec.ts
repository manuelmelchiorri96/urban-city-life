import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token', () => {
    const token = 'testToken';
    service.setToken(token);
    expect(service.getToken()).toEqual(token);
  });

  it('should remove token', () => {
    const token = 'testToken';
    service.setToken(token);
    service.removeToken();
    expect(service.getToken()).toBeNull();
  });

  it('should set and get isLogged', () => {
    service.setIsLogged(true);
    expect(service.getIsLogged()).toEqual('true');
  });
});
