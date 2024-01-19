import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  setIsLogged(isLogged: boolean): void {
    localStorage.setItem('isLogged', isLogged === true ? 'true' : 'false');
  }

  getIsLogged(): string | null {
    return localStorage.getItem('isLogged');
  }

  setName(nome: string): void {
    localStorage.setItem('nome', nome);
  }

  getName(): string | null {
    return localStorage.getItem('nome');
  }

  setEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  setGenere(genere: string): void {
    localStorage.setItem('genere', genere);
  }

  getGenere(): string | null {
    return localStorage.getItem('genere');
  }

  setStatus(status: string): void {
    localStorage.setItem('status', status);
  }

  getStatus(): string | null {
    return localStorage.getItem('status');
  }

  setId(id: string): void {
    localStorage.setItem('id', id);
  }

  getId(): string | null {
    return localStorage.getItem('id');
  }
}
