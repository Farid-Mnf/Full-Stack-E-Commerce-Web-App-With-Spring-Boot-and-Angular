import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestDTO } from '../model/LoginRequestDTO';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginRequest: LoginRequestDTO): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginRequest, { observe: 'response'});
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserDetails() {
    const token = this.getToken();
    console.log("getUserDetials token : " + token);
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if(token === null) return false;
    else{
      if(this.jwtHelper.isTokenExpired(token)) return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
