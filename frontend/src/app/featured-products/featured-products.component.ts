import { Component } from '@angular/core';
import { ProductDTO } from '../model/ProductDTO';
import { ProductService } from '../service/product.service';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'featured-products',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Featured Products Section -->
    <div class="container my-5">
        <h2 class="text-center mb-4">Featured Products</h2>

        <div class="row">
        @for (product of featuredProducts; track product.id) {
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
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
    isLoggedIn: boolean = false;
    featuredProducts: ProductDTO[] = [];
    

    constructor(private productService: ProductService, private authService: AuthService, private router: Router){
        this.getFeaturedProducts();
        this.isLoggedIn = authService.isLoggedIn();

    }

    getFeaturedProducts() {
        this.productService.getFeaturedProducts().subscribe(data => {
            this.featuredProducts = data;
        });
    }

    addToCart(productId: string, event: MouseEvent){
        if(!this.isLoggedIn) this.router.navigate(['/login']);
        else this.productService.addProductToCart(productId);
    }
}

