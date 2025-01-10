import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { JwtToken } from '../model/jwt-token.model';
import { LoginCredentials } from '../model/request/login-credential.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
    private apiConstants: ApiConstants) { }

  login(loginCredentials: LoginCredentials): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(this.apiConstants.login(), loginCredentials);
  }

  logout(): void {
    localStorage.removeItem('bearer-token');
  }
}
