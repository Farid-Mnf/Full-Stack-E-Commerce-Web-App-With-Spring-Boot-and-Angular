import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDTO } from '../model/UserDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = 'http://localhost:8080/user/';
  user!: UserDTO;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get<UserDTO>(this.apiURL + this.getUserId())
  }

  getUser(): Observable<UserDTO>{
    return this.http.get<UserDTO>(this.apiURL + this.getUserId());
  }
  getUserId(){
    return this.authService.getUserDetails().userId;
  }
}
