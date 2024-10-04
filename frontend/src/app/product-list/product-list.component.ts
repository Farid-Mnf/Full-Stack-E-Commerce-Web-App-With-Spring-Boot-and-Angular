import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CategoryDTO } from '../model/CategoryDTO';
import { ProductService } from '../service/product.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterDTO } from '../model/FilterDTO';
import { ProductDTO } from '../model/ProductDTO';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  template: `
  <my-header></my-header>
  <div style="height: 80px;"></div>
  

  <div class="container mt-4">
    <div class="row">
      <!-- Left Sidebar for Filters -->
      <div class="col-md-3">
          <form [formGroup]="filters" (submit)="applyFilter(categoryDTO?.id || null)">
          <div class="card p-3 shadow">
            <h5 class="mb-3">Filters</h5>
            <!-- Category Filter -->
            <div class="mb-3">
              <label for="category" class="form-label">
                <i class="fas fa-list"></i> Category
              </label>
              <select formControlName="category" class="form-select" id="category">
                  <option  [value]="categoryDTO?.id">Choose ...</option>
                  @for (category of categories; track category.id) {
                    <option [value]="category.id">{{category.name}}</option>
                  }
              </select>
            </div>
            <div class="mb-3">
              <label for="price-range" class="form-label">
                <i class="fas fa-dollar-sign"></i> Price Range
              </label>
              <input formControlName="priceRange" type="range" class="form-range" id="price-range" min="0" max="50000" (change)="onRangeChange($event)">
              <p class="text-muted" #priceRangeText>0 - 1000</p>
            </div>

            <!-- Availability Filter -->
            <div class="mb-3 form-check">
              <input formControlName="inStock" type="checkbox" class="form-check-input" id="in-stock">
              <label class="form-check-label" for="in-stock">
                <i class="fas fa-box"></i> In Stock
              </label>
            </div>
            <!-- Apply Filter Button -->
            <button type="submit" class="btn btn-primary w-100">
              <i class="fas fa-filter"></i> Apply Filters
            </button>
          </div>
        </form>
        </div>
      
      <!-- Right Column for Product List -->
      <div class="col-md-9">
        <div class="row justify-content-center">
          <!-- Repeat this product card block for each product -->
          @for (product of productsFiltered; track product.id) {
          <div class="col-md-12 mb-3">
            <div class="card p-3 shadow">
              <div class="row g-0">
                <!-- Product Image -->
                <div class="col-md-3">
                  <img
                    [src]="'http://localhost:8080/images/' + product.imageUrl"
                    class="img-fluid rounded-start"
                    alt="Product Image"
                  />
                </div>
                <!-- Product Details -->
                <div class="col-md-9">
                  <div class="card-body d-flex justify-content-between align-items-center">
                    <!-- Product Name, Price, and Seller Profile -->
                    <div style="width: 75%;">
                      <h5 class="card-title clickable" [routerLink]="['/product', product.id]">{{ product.name }}</h5>
                      <h5 class="card-title clickable" [routerLink]="['/product', product.id]">{{ product.description }}</h5>
                      <p class="card-text text-muted mb-1 fs-4">
                        <i class="fas fa-tag"></i> $<span>{{ product.price }}</span>
                      </p>
                      <!-- Available Quantity in Stock -->
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
                      <!-- Seller Profile Link -->
                      <p class="mb-1">
                        Sold by:
                        <a href="/seller-profile/seller-id" class="text-decoration-none">
                          <i class="fas fa-user"></i> {{ product.userDTO.name }}
                        </a>
                      </p>
                    </div>
                    <!-- Add to Cart Button -->

                    @if(product.availableQuantity === 0){
                      <button (click)="addToCart(product.id, $event)" class="btn btn-primary" style="width: 20%;" disabled>
                        <i class="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    }
                    @if(product.availableQuantity > 0){
                      <button (click)="addToCart(product.id, $event)" class="btn btn-primary" style="width: 20%;"> 
                        <i class="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          <!-- Repeat product card block ends here -->
        </div>
      </div>

    </div>
  </div>

  `,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  categories: CategoryDTO[] = [];
  productsFiltered: ProductDTO[] = [];
  @ViewChild('priceRangeText') priceRangeText!: ElementRef;
  
  isLoggedIn: boolean = false;
  parameter: string = '';
  categoryDTO: CategoryDTO | null = null;

  filters: FormGroup = new FormGroup({
    category: new FormControl(this.categoryDTO?.id),
    priceRange: new FormControl(3000),
    inStock: new FormControl(false)
  });

  constructor(private productService: ProductService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {
    this.isLoggedIn = authService.isLoggedIn();
    this.getAllCategories().subscribe((data) => {
      this.categories = data;
      this.route.params.subscribe(params => {
        const searchParam = params['parameter'];
        console.log('parameter: ', this.parameter);
        this.handleAppropriateParameterAction(searchParam);
      })
    });
  }

  handleAppropriateParameterAction(parameter: string) {
    let foundCategory = false;
    this.categories.forEach(categoryDTO => {
      if (categoryDTO.name.toLowerCase() === parameter.toLowerCase()) {
        foundCategory = true;
        this.categoryDTO = categoryDTO;
        this.applyFilter(categoryDTO.id);
      }
    });
    if (!foundCategory) {
      this.applySearchFilter(parameter);
    }
  }


  getAllCategories() {
    return this.productService.getAllCategories();
  }

  applyFilter(category: string | null) {
    const filterDTO = new FilterDTO(
      this.filters.get('category')?.value || category,
      this.filters.get('priceRange')?.value,
      this.filters.get('inStock')?.value,
      category);

    this.productService.getFilteredProducts(filterDTO).subscribe(data => {
      this.productsFiltered = data;
    });
  }

  applySearchFilter(parameter: string | null) {
    const filterDTO = new FilterDTO(
      this.filters.get('category')?.value,
      this.filters.get('priceRange')?.value,
      this.filters.get('inStock')?.value,
      parameter);
    console.log("applying search filter");

    this.productService.getFilteredProducts(filterDTO).subscribe(data => {
      this.productsFiltered = data;
    });
  }


  onRangeChange(event: any) {
    const priceRange = event.target.value;
    this.priceRangeText.nativeElement.textContent = `0 - ${priceRange}`;
  }


  addToCart(productId: string, event: MouseEvent) {
    if (!this.isLoggedIn) this.router.navigate(['/login']);
    else {
      this.productService.addProductToCart(productId, 1);
      const button = event.target as HTMLButtonElement;
      button.innerHTML = '<i class="fas fa-check-double"></i> Added to Cart';
      this.sharedService.updateHeaderValue(true);
    }
  }


}

