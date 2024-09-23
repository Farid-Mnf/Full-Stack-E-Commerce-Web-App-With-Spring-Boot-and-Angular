import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CartService } from '../service/cart.service';
import { PurchaseService } from '../service/purchase.service';

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
      <h2><i class="fas fa-shopping-cart"></i> Shopping Cart</h2>
      <ul class="list-group shadow">
        @for (cartItem of cartItems; track $index) {
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <img [src]="cartItem.product.imageUrl" class="img-thumbnail me-3" alt="{{ cartItem.product.name }}" style="width: 100px; height: 100px;">
              <div>
                <h5>{{ cartItem.product.name }}</h5>
                <p>Price: <strong>{{ cartItem.product.price | currency }}</strong></p>
                <p>Quantity: {{ cartItem.quantity }}</p>
                <button (click)="removeFromCart(cartItem)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash-alt"></i> Remove
                </button>
              </div>
            </div>
            <span class="badge bg-primary rounded-pill">
              {{ (cartItem.product.price * cartItem.quantity) | currency}}
            </span>
          </li>
        }
      </ul>
      
      <div class="text-end mt-3">
        <h4 class="text-muted">Total: <strong>{{ cartTotal | currency }}</strong></h4>
        <button class="btn btn-success" (click)="checkout()">
          <i class="fas fa-credit-card"></i> Checkout
        </button>
      </div>
    </div>

    <!-- Purchase History Section -->
    <div class="col-md-4">
      <h2><i class="fas fa-history"></i> Purchase History</h2>
      <ul class="list-group shadow">
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
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  cartTotal: number = 0;
  purchaseHistory: any[] = [];
  selectedOrder: any;

  constructor(private cartService: CartService, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.loadCartItems();
    // this.loadPurchaseHistory();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log(items);
      
      this.calculateCartTotal();
    });
  }

  loadPurchaseHistory(): void {
    this.purchaseService.getPurchaseHistory().subscribe((history) => {
      this.purchaseHistory = history;
    });
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  removeFromCart(cartItem: any): void {
    this.cartService.removeCartItem(cartItem.product.id).subscribe(() => {
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





// viewOrderDetails(arg0: string) {
// throw new Error('Method not implemented.');
// }
//   cartTotal: number = 332.94;
  
//   checkout() {

//   }
//   removeFromCart(_t7: any) {
//   }

  // cartItems = [
  //   {
  //     quantity: 7,
  //     product: {
  //       imageUrl: '/assets/product.jpg',
  //       name: 'Headset',
  //       price: 322.88
  //     }
  //   },
  //   {
  //     quantity: 1,
  //     product: {
  //       imageUrl: '/assets/product.jpg',
  //       name: 'Headset',
  //       price: 32.88
  //     }
  //   },
  //   {
  //     quantity: 5,
  //     product: {
  //       imageUrl: '/assets/product.jpg',
  //       name: 'Headset',
  //       price: 90
  //     }
  //   }
  // ]


  // purchaseHistory = [
  //   {
  //     orderId: "8239.23823.8dfkljsdrsdkdsddfjsdkljfsdlkf",
  //     date: Date.now(),
  //     quantity: 3,
  //     totalPrice: 2030.94,
  //     totalItems: 5,
  //     product: {
  //       name: 'Smart TV'
  //     }
  //   },
  //   {
  //     orderId: "83293829384kldjfd823sdklfjdklaDSKFLJ",
  //     date: Date.now(),
  //     quantity: 6,
  //     totalPrice: 1730.54,
  //     totalItems: 8,
  //     product: {
  //       name: 'Iphone'
  //     }
  //   }
  // ]

}
