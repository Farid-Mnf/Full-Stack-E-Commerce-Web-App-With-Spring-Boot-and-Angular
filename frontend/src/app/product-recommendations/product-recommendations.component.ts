import { Component } from '@angular/core';
import { ProductDTO } from '../model/ProductDTO';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { ProductService } from '../service/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-recommendations',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Product Recommendations Section -->
    <div class="container my-5">
        <h2 class="text-center mb-4">Trending Products</h2>
        <div class="row">
        @for (product of trendingProducts; track product.id) {
            <div class="col-md-3">
                <div class="card shade p-2">
                    <img [src]="'http://localhost:8080/images/' + product.imageUrl" class="card-img-top product-img" [alt]="product.name">
                    <div class="card-body">
                        <h5 class="card-title clickable" [routerLink]="['/product', product.id]">{{ product.name }}</h5>
                        <p class="card-text">$<span class="fs-4">{{product.price}}</span></p>
                        <button class="btn btn-primary" (click)="addToCart(product.id, $event)">
                            <i class="fa-solid fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        }

        </div>
    </div>

    <!-- Login toast -->
    @if (showLoginToast) {
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">
        <div class="toast show align-items-center text-bg-dark border-0 shadow-lg" role="alert">
          <div class="d-flex">
            <div class="toast-body">
              <i class="fas fa-sign-in-alt me-2"></i> Please log in to add items to your cart. Redirecting...
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './product-recommendations.component.css'
})
export class ProductRecommendationsComponent {
    trendingProducts: ProductDTO[] = [];
    isLoggedIn: boolean = false;
    showLoginToast: boolean = false;

    constructor(private productService: ProductService, private authService: AuthService, private router: Router, private sharedService: SharedService){
        this.getTrendingProducts();
        this.isLoggedIn = authService.isLoggedIn();
    }

    getTrendingProducts() {
        this.productService.getTrendingProducts().subscribe(data => {
            this.trendingProducts = data;
        });
    }


    addToCart(productId: string, event: MouseEvent){
        if(!this.isLoggedIn) {
            this.showLoginToast = true;
            setTimeout(() => this.router.navigate(['/login']), 1500);
            return;
        }
        this.productService.addProductToCart(productId, 1);
        const button = event.currentTarget as HTMLButtonElement;
        button.innerHTML = '<i class="fas fa-check-double"></i> Added to Cart';
        button.disabled = true;
        this.sharedService.updateHeaderValue(true);
    }


}
