import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../common/Login';
import { Register } from '../common/Register';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://watchstore2.herokuapp.com/api/auth/';

  constructor(private sessionService: SessionService, private http: HttpClient) { }

  login(userData: Login): Observable<any> {
    return this.http.post(this.url + 'signin', userData);
  }
  register(user: Register): Observable<any> {
    return this.http.post(this.url + 'signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'send-mail-forgot-password-token', email);
  }
  getForgotPassword(email: string): Observable<any> {
    return this.http.post(this.url + 'email', email);
  }
}
