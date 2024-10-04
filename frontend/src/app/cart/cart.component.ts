import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CartService } from '../service/cart.service';
import { PurchaseService } from '../service/purchase.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, HeaderComponent],
  template: `
<my-header></my-header>
<div style="height: 80px;"></div>

<div class="container mt-4">
  <div class="row">
    
    <!-- Current Cart Section -->
    <div class="col-md-8">
      <h2 class="mb-4"><i class="fas fa-shopping-cart"></i> Shopping Cart</h2>
      <ul class="list-group shadow">

      @if(!cartItems){
        <div class="text-center my-5">
          <i class="fas fa-box-open fa-10x text-muted mb-3"></i>
          <p class="lead text-muted">Your cart is currently empty.</p>
        </div>
      }

        @for (cartItem of cartItems; track $index) {
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <img [src]="'http://localhost:8080/images/' + cartItem.imageUrl" class="img-thumbnail me-3" alt="{{ cartItem.productName }}" style="width: 100px; height: 100px;">
              <div>
                <h5>{{ cartItem.productName }}</h5>
                <p>Price: <strong>{{ cartItem.price | currency }}</strong></p>
                <p>Quantity: {{ cartItem.quantity }}</p>
                <button (click)="removeFromCart(cartItem)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash-alt"></i> Remove
                </button>
              </div>
            </div>
            <span class="badge bg-primary rounded-pill">
              {{ (cartItem.price * cartItem.quantity) | currency}}
            </span>
          </li>
        }
      </ul>
      
      <div class="text-end mt-3">
        <h4 class="text-muted">Total: <strong>{{ cartTotal | currency }}</strong></h4>
        <button class="btn btn-success mb-4" (click)="checkout()">
          <i class="fas fa-credit-card"></i> Checkout
        </button>
      </div>
    </div>

    <!-- Purchase History Section -->
    <div class="col-md-4">
      <h2><i class="fas fa-history"></i> Purchase History</h2>
      <ul class="list-group shadow">
        <li>list of previous orders checked</li> 
        @for (purchase of purchaseHistory; track $index) {
          <li class="list-group-item">
            <h6 class="text-break">Order ID: <span class="text-muted">{{ purchase.orderId }}</span></h6>
            <p><i class="fas fa-calendar-alt"></i> Purchased on: {{ purchase.date }}</p>
            <p><i class="fas fa-box-open"></i> Total Items: {{ purchase.totalItems }}</p>
            <p><i class="fas fa-dollar-sign"></i> Total: {{ purchase.totalPrice | currency }}</p>
            <button class="btn btn-primary btn-sm" (click)="viewOrderDetails(purchase.orderId)">
              <i class="fas fa-info-circle"></i> View Details
            </button>
          </li>
        }
      </ul>
    </div>

  </div>
</div>

  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  cartTotal: number = 0;
  purchaseHistory: any[] = [];
  selectedOrder: any;

  constructor(private cartService: CartService, private purchaseService: PurchaseService, private sharedService: SharedService) { 
  }

  ngOnInit(): void {    
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;          
      this.calculateCartTotal();
      if(!this.cartItems){
        this.sharedService.updateHeaderValue(false);
      }
    });
  }

  loadPurchaseHistory(): void {
    this.purchaseService.getPurchaseHistory().subscribe((history) => {
      this.purchaseHistory = history;
    });
  }

  calculateCartTotal(): void {
    if(this.cartItems)
      this.cartTotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    else
      this.cartTotal = 0;
  }

  removeFromCart(cartItem: any): void {    
    this.cartService.removeCartItem(cartItem.id).subscribe(() => {
      this.loadCartItems();  
    });
    
  }

  checkout(): void {
    // Handle checkout logic
  }

  viewOrderDetails(orderId: string): void {
    // Load the details of the selected order
    this.selectedOrder = this.purchaseHistory.find(order => order.orderId === orderId);
  }

}
