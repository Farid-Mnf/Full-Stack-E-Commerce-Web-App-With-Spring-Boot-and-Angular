import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartAPI: string = 'http://localhost:8080/cart';
  private cartIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  cartId: string | null = null;


  constructor(private http: HttpClient, private userService: UserService) {    
    userService.getUser()?.subscribe(user => {
      this.cartId = user.cartDTO.id;
      this.cartIdSubject.next(this.cartId); // Emit the cartId
    })
  }

  getCartItems(): Observable<any[]> {    
    
    return this.cartIdSubject.pipe(
      switchMap(cartId => {
        if (cartId) {
          console.log('Fetching cart items for cartId:', cartId);
          return this.http.get<any[]>(this.cartAPI + "/" + cartId);
        } else {
          console.error('Cart ID is not available');
          return [];
        }
      })
    );
  }

  removeCartItem(cartItemId: string): Observable<void> {
    return this.http.delete<void>(this.cartAPI + '/' + cartItemId);
  }
  
}
