import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CategoryDTO } from '../model/CategoryDTO';
import { ProductService } from '../service/product.service';
import { FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterDTO } from '../model/FilterDTO';
import { ProductDTO } from '../model/ProductDTO';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  template: `
  <my-header></my-header>

  <div style="height: 80px;"></div>

  <div class="container mt-4">
    <div class="row">
      <!-- Left Sidebar for Filters -->
      <div class="col-md-3">
          <form [formGroup]="filters" (submit)="applyFilter()">
          <div class="card p-3 shadow-sm">
            <h5 class="mb-3">Filters</h5>
            <!-- Category Filter -->
            <div class="mb-3">
              <label for="category" class="form-label">
                <i class="fas fa-list"></i> Category
              </label>
              <select formControlName="category" class="form-select" id="category">
                <option value="">Select a category</option>
                @for (category of categories; track category.id) {
                  <option [value]="category.id">{{category.name}}</option>
                }
              </select>
            </div>
            <div class="mb-3">
              <label for="price-range" class="form-label">
                <i class="fas fa-dollar-sign"></i> Price Range
              </label>
              <input formControlName="priceRange" type="range" class="form-range" id="price-range" min="0" max="10000" (change)="onRangeChange($event)">
              <p class="text-muted" #priceRangeText>0 - 1000</p>
            </div>

            <!-- Brand Filter -->
            <!-- <div class="mb-3">
              <label for="brand" class="form-label">
                <i class="fas fa-industry"></i> Brand
              </label>
              <select class="form-select" id="brand">
                <option selected>Choose...</option>
                <option value="1">Brand A</option>
                <option value="2">Brand B</option>
                <option value="3">Brand C</option>
              </select>
            </div> -->
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
            <div class="card p-3 shadow-sm">
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
                      <h5 class="card-title">{{ product.name }}</h5>
                      <h5 class="card-title">{{ product.description }}</h5>
                      <p class="card-text text-muted mb-1 fs-4">
                        <i class="fas fa-tag"></i> $<span>{{ product.price }}</span>
                      </p>
                      <!-- Available Quantity in Stock -->
                      <p class="card-text text-muted mb-1">
                        <i class="fas fa-box-open"></i> <span style="color: green;"> In Stock</span>
                      </p>
                      <!-- Seller Profile Link -->
                      <p class="mb-1">
                        Sold by:
                        <a href="/seller-profile/seller-id" class="text-decoration-none">
                          <i class="fas fa-user"></i> {{ product.userDTO.name }}
                        </a>
                      </p>
                    </div>
                    <!-- Add to Cart Button -->
                    <button class="btn btn-primary" style="width: 20%;"> 
                      <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
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

  filters: FormGroup = new FormGroup({
    category: new FormControl(''),
    priceRange: new FormControl(3000),
    inStock: new FormControl(false)
  });

  
  
  constructor(private productService: ProductService){
    this.getAllCategories();
  }
  
  getAllCategories(){
    return this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  
  applyFilter() {
    const filterDTO = new FilterDTO(
      this.filters.get('category')?.value, 
      this.filters.get('priceRange')?.value, 
      this.filters.get('inStock')?.value);

      this.productService.getFilteredProducts(filterDTO).subscribe(data => {
        console.log(data);
        
        this.productsFiltered = data;
      });
  }

  onRangeChange(event: any) {
    const priceRange = event.target.value;
    this.priceRangeText.nativeElement.textContent = `0 - ${priceRange}`;
  }


}

