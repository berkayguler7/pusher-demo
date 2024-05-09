import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import env from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = env.apiURL + '/user';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiURL}/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiURL}/register`, { name, email, password });
  }

  logout() {
    document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    window.location.href = '/login';
  }
}
