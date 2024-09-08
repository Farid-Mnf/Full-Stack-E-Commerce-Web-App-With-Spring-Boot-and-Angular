import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestDTO } from '../model/LoginRequestDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequestDTO): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginRequest, { observe: 'response'});
  }

}
