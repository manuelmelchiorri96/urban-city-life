import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { UserSignUp } from '../../models/interface/userSignUp';
import { User } from '../../models/interface/user';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register a user', () => {
    const dummyUser: UserSignUp = {
      name: '',
      email: '',
      gender: '',
      status: '',
    };

    service.registraUser(dummyUser).subscribe();

    const req = httpTestingController.expectOne(
      `${service.getBaseUrl()}/v2/users`
    );
    expect(req.request.method).toEqual('POST');

    req.flush({});
  });

  it('should send a GET request to retrieve users', () => {
    service.trovaUsers().subscribe();

    const req = httpTestingController.expectOne(
      `${service.getBaseUrl()}/v2/users`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should send a DELETE request to delete a user', () => {
    const userId = 1;

    service.eliminaUser(userId).subscribe();

    const req = httpTestingController.expectOne(
      `${service.getBaseUrl()}/v2/users/${userId}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should send a PUT request to update user profile', () => {
    const dummyUser: User = {
      id: 0,
      name: null,
      email: null,
      gender: null,
      status: null,
    };

    service.modificaProfilo(dummyUser).subscribe();

    const req = httpTestingController.expectOne(
      `${service.getBaseUrl()}/v2/users/${dummyUser.id}`
    );
    expect(req.request.method).toEqual('PUT');

    req.flush({});
  });

  it('should send a GET request to retrieve all posts', () => {
    service.trovaPosts().subscribe();

    const req = httpTestingController.expectOne(
      `${service.getBaseUrl()}/v2/posts`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve posts of a user', () => {
    const userId = 1;

    service.trovaPostDellUtente(userId).subscribe();

    const req = httpTestingController.expectOne(
      `${service.getBaseUrl()}/v2/users/${userId}/posts`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });
});
