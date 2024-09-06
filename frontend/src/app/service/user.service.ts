import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = 'localhost:8080'

  constructor() { }
}
