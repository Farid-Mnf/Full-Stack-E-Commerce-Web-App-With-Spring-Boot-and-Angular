import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private headerValueSubject = new BehaviorSubject<boolean>(false);
  headerValue$ = this.headerValueSubject.asObservable(); // Observable to allow other components to subscribe

  // Method to update the header value
  updateHeaderValue(newValue: boolean) {
    this.headerValueSubject.next(newValue);
  }

}
