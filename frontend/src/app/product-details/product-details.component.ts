import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ProductDTO } from '../model/ProductDTO';
import { HeaderComponent } from "../header/header.component";
import { CurrencyPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HeaderComponent, CurrencyPipe, RouterLink, ReactiveFormsModule],
  template: `
  <my-header></my-header>
  <div style="height: 100px;"></div>

    @if (product) {
      <div class="container my-5">
        <div class="row">
          <!-- Product Image - 40% width -->
          <div class="col-md-4 d-flex justify-content-center">
            <img 
            [src]="'http://localhost:8080/images/' + product.imageUrl" 
            class="img-fluid rounded shadow product-image" 
            alt="{{ product.name }}" 
            >
          </div>

          <!-- Product Details - 60% width -->
          <div class="col-md-6 mx-4">
            <!-- Product Name -->
            <h2 class="mb-3">{{ product.name }}</h2>

            <!-- Product Description -->
            <p class="lead">{{ product.description }}</p>

            <!-- Price -->
             @if(product.availableQuantity > 0){
               <h3 class="text-success mb-4">
                 <i class="fas fa-dollar-sign"></i> {{ product.price | currency }}
               </h3>
             }
             @if(product.availableQuantity === 0){
              <h3 class="text-danger mb-4">
                 <i class="fas fa-dollar-sign"></i> {{ product.price | currency }}
               </h3>
             }

            <!-- Seller Name with Link -->
            <p>
              <i class="fas fa-user"></i> Sold by: 
              <a [routerLink]="['/seller', product.userDTO.id]" class="text-primary">{{ product.userDTO.name }}</a>
            </p>

            <!-- Available Quantity Dropdown -->
            <div class="mb-4" style="width: 20%;">
              <label for="quantity" class="form-label">
                <i class="fas fa-boxes"></i> Quantity:
              </label>
              <select id="quantity" class="form-select" [formControl]="selectedQuantity">
                @for (value of availQuantities; track value) {
                  <option [value]="value">{{ value }}</option>
                }
              </select>
            </div>

            @if (product.availableQuantity === 0) {
              <p class="card-text text-muted mb-1">
                <i class="fas fa-box-open"></i> <span style="color: red;"> Out of Stock</span>
              </p>
            }
            @if(product.availableQuantity > 0){
              <p class="card-text text-muted mb-1">
                <i class="fas fa-box-open"></i> <span style="color: green;"> In Stock</span>
              </p>
            }

            <!-- Add to Cart Button -->
             @if (product.availableQuantity > 0) {
               <button (click)="addToCart()" class="btn btn-primary btn-lg">
                 <i class="fas fa-cart-plus"></i> Add to Cart
               </button>
             }
             @if(product.availableQuantity === 0){
              <button (click)="addToCart()" class="btn btn-primary btn-lg" disabled>  
                 <i class="fas fa-cart-plus"></i> Add to Cart
               </button>
             }
          </div>
        </div>
      </div>    
    }
  `,
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  isDisabled: boolean = false;
  product!: ProductDTO;
  selectedQuantity: FormControl =  new FormControl(1);
  availQuantities: Number[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  addToCart(): void {
    if(this.product.availableQuantity > 0){
      console.log(this.selectedQuantity.value);
    }
    
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');    
    if (productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
        this.availQuantities = Array.from({ length: this.product.availableQuantity }, (_, i) => i + 1);
        if(product.availableQuantity === 0){
          this.isDisabled = true;
        }
      });
    }
  }

}
