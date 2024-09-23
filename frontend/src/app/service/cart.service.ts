import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartAPI: string = 'http://localhost:8080/cart';
  cartId: string = '';

  constructor(private http: HttpClient, private userService: UserService) {
    userService.getUser()?.subscribe(user => {
      this.cartId = user.cartDTO.id;
    })
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.cartAPI + "/" + this.cartId);
  }

  removeCartItem(productId: string): Observable<void> {
    return this.http.delete<void>(`/api/cart/${productId}`);
  }
  

}
