import { Component } from '@angular/core';
import { ProductDTO } from '../model/ProductDTO';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'product-recommendations',
  standalone: true,
  imports: [],
  template: `
    <!-- Product Recommendations Section -->
    <div class="container my-5">
        <h2 class="text-center mb-4">Trending Products</h2>
        <div class="row">
        @for (product of trendingProducts; track product.id) {
            <div class="col-md-3">
                <div class="card shade">
                    <img [src]="'http://localhost:8080/images/' + product.imageUrl" class="card-img-top product-img" [alt]="product.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
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

  `,
  styleUrl: './product-recommendations.component.css'
})
export class ProductRecommendationsComponent {
    trendingProducts: ProductDTO[] = [];
    isLoggedIn: boolean = false;

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
        if(!this.isLoggedIn) this.router.navigate(['/login']);
        else{
            this.productService.addProductToCart(productId);
            const button = event.target as HTMLButtonElement;
            button.innerHTML = '<i class="fas fa-check-double"></i> Added to Cart';
            this.sharedService.updateHeaderValue(true);
        }
    }


}
