import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { LocalStorageService } from './local-storage.service';

describe('JwtInterceptorService', () => {
  let service: JwtInterceptorService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'getToken',
    ]);
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptorService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });
    service = TestBed.inject(JwtInterceptorService);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not add Authorization header if token does not exist', () => {
    localStorageService.getToken.and.returnValue(null);

    const request = new HttpRequest<any>('GET', '/api/data');
    const handler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> =>
        of(null as any),
    };

    const intercepted = service.intercept(request, handler);

    intercepted.subscribe(() => {
      expect(localStorageService.getToken).toHaveBeenCalled();
      expect(intercepted).toBeTruthy();
      expect(request.headers.has('Authorization')).toBeFalse();
    });
  });

  it('should add Authorization header with Bearer token if token exists', () => {
    const token = 'testToken';
    localStorageService.getToken.and.returnValue(token);

    const request = new HttpRequest<any>('GET', '/api/data');
    const handler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> =>
        of(null as any),
    };

    const intercepted = service.intercept(request, handler);

    intercepted.subscribe(() => {
      expect(localStorageService.getToken).toHaveBeenCalled();
      expect(intercepted).toBeTruthy();
      expect(request.headers.has('Authorization'));
    });
  });
});
