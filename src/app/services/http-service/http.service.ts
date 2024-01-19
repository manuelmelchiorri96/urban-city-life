import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commento } from '../../models/interface/commento';
import { RegisterPost } from '../../models/interface/registerPost';
import { User } from '../../models/interface/user';
import { UserSignUp } from '../../models/interface/userSignUp';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = 'https://gorest.co.in/public';

  constructor(private http: HttpClient) {}

  getBaseUrl(): string {
    return this.baseUrl;
  }

  registraUser(user: UserSignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/v2/users`, user);
  }

  trovaUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v2/users`);
  }

  eliminaUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/v2/users/${id}`);
  }

  trovaPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v2/posts`);
  }

  trovaPostDellUtente(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/v2/users/${id}/posts`);
  }

  aggiungiPost(nuovoPost: RegisterPost): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/v2/users/${nuovoPost.user_id}/posts`,
      nuovoPost
    );
  }

  commentaPost(commento: Commento): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/v2/posts/${commento.post_id}/comments`,
      commento
    );
  }

  leggiCommentiPost(idPost: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/v2/posts/${idPost}/comments`);
  }

  modificaProfilo(userDaModificare: User) {
    return this.http.put(
      `${this.baseUrl}/v2/users/${userDaModificare.id}`,
      userDaModificare
    );
  }
}
