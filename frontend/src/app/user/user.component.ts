import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDTO } from '../model/UserDTO';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryDTO } from '../model/CategoryDTO';
import { ProductService } from '../service/product.service';
import { NgIf } from '@angular/common';
import { ProductDTO } from '../model/ProductDTO';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, HeaderComponent],
  template: `
<div class="container-fluid">
  <my-header></my-header>
  <div class="spacer">
    &nbsp;
</div>
  <div class="row">
    <!-- Left Side Panel -->
    <div class="col-md-3" style="min-height: 100vh;background-color:#d7d7d7">
      <ul class="nav flex-column p-3">
        <!-- <button class="btn btn-dark mb-4 w-50" (click)="goHome()"><i class="fa-solid fa-house"></i> Home</button> -->
        <!-- Basic Info -->
        <li class="nav-item">
          <a class="nav-link active" [class]="{'active': currentView === 'overview'}" (click)="setView('overview')"><i class="fas fa-user-circle"></i> Basic Info</a>
        </li>
        <!-- Orders -->
        <li class="nav-item">
          <a class="nav-link" [class]="{'active': currentView === 'orders'}" (click)="setView('orders')"><i class="fas fa-box"></i> My Orders</a>
        </li>
        <!-- Seller Dashboard -->
        <li class="nav-item">
          <a class="nav-link"  [class]="{'active': currentView === 'sell'}" (click)="setView('sell')"> <i class="fas fa-store"></i> Seller Dashboard</a>
        </li>
        <!-- Payment -->
        <li class="nav-item">
          <a class="nav-link"  [class]="{'active': currentView === 'payment'}" (click)="setView('payment')"><i class="fas fa-credit-card"></i> Saved  Payment Methods</a>
        </li>
        <!-- Settings -->
        <li class="nav-item">
          <a class="nav-link" [class]="{'active': currentView === 'settings'}" (click)="setView('settings')"><i class="fas fa-cog"></i> Account Settings</a>
        </li>
      </ul>
    </div>

    <!-- Right Side Content -->
    @if(isLoggedIn && userDetails){
    <div class="col-md-9 p-4" style="background-color: #f1f1f1;">
      @if(currentView === 'overview'){
        <div class="container mt-4">
          <div class="justify-content-center">
            <!-- Profile Image and Upload Button -->
            @if(loading){
              <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <p>Uploading your image, please wait...</p>
              </div>
            }
            <div class="text-center">
              <div class="mb-4">
                @if(userDetails.userImage){
                  <img [src]="'http://localhost:8080/images/' + userDetails.userImage" class="rounded-circle img-fluid" alt="Profile Image" style="width: 150px; height: 150px; object-fit: cover;">
                }
                @if(!userDetails.userImage){
                  <img src="/assets/user_image.jpg" class="rounded-circle img-fluid" alt="Profile Image" style="width: 150px; height: 150px; object-fit: cover;">
                }                
              </div>
              <div class="mb-4">
                <label for="file-upload" class="btn btn-outline-primary">
                  <i class="fas fa-upload"></i> Change Profile Picture
                </label>
                <input id="file-upload" type="file" accept="image/*" (change)="onImageSelected($event)" style="display: none;">
              </div>
            </div>

            <!-- User Information -->
            <div class="">
              <div class="card">
                <div class="card-header text-center" style="background-color: darkgray;">
                  <h3><i class="fa-solid fa-user"></i> Basic Information</h3>
                </div>
                <div class="card-body" style="background-color: lightgray;">
                  <ul class="list-group list-group-flush user-info-list">
                    <li class="list-group-item fs-3">
                      <div class="row p-3">
                        <div class="col-md-6">
                          <span><strong>Name:</strong> {{ userDetails.name }}</span>
                        </div>
                        <div class="col-md-6">
                          <span><strong>Email:</strong> {{ userDetails.email }}</span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item fs-3">
                      <div class="row p-3">
                        <div class="col-md-6">
                          <span><strong>Phone:</strong> {{ userDetails.phone }}</span>
                        </div>
                        <div class="col-md-6">
                          <span><strong>Country:</strong> {{ userDetails.addressDTO.country }}</span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item fs-3">
                      <div class="row p-3">
                        <div class="col-md-6">
                          <span><strong>City:</strong> {{ userDetails.addressDTO.city }}</span>
                        </div>
                        <div class="col-md-6">
                          <span><strong>Street name:</strong> {{ userDetails.addressDTO.streetName }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      @if(currentView === 'orders'){
        <div>
          <h2>My Orders</h2>
          <p>List of your recent orders will appear here.</p>
          <!-- Orders Content -->
        </div>
      }

      @if(currentView === 'settings'){
        <div>
          <h2>Account Settings</h2>
          <p>Change your account settings such as password and preferences.</p>
          <!-- Settings Content -->
        </div>
      }

      @if(currentView === 'sell'){
        <div class="container mt-5" >
          <!-- Modal for Success Message -->
          <div *ngIf="showModal" class="modal show d-block" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title"><i class="fas fa-check-circle text-success"></i> Product Added Successfully!</h5>
                  <button type="button" class="btn-close" aria-label="Close" (click)="closeModal()"></button>
                </div>
                <div class="modal-body text-center">
                  <p>Your product has been added successfully.</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-success" (click)="closeModal()">Okay</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Backdrop when modal is shown -->
          <div *ngIf="showModal" class="modal-backdrop fade show"></div>


          <!-- Add Product Section -->
          <div class="card mb-4">
            <div class="card-header text-center" style="background-color: darkgray;">
              <h3><i class="fas fa-plus-circle"></i> Add a New Product</h3>
            </div>
            <div class="card-body" style="background-color: lightgray;">
              <form [formGroup]="newProduct" (submit)="handleNewProductSubmition()">
                <div class="mb-3">
                  <label for="productName" class="form-label">
                    <i class="fas fa-box"></i> Product Name
                  </label>
                  <input type="text" formControlName="name" class="form-control smoky" id="productName" placeholder="Enter product name">
                </div>

                <div class="mb-3">
                  <label for="productDescription" class="form-label">
                    <i class="fas fa-align-left"></i> Product Description
                  </label>
                  <textarea class="form-control smoky" formControlName="description" id="productDescription" rows="3" placeholder="Enter product description"></textarea>
                </div>

                <div class="mb-3">
                  <label for="productPrice" class="form-label">
                    <i class="fas fa-dollar-sign"></i> Price
                  </label>
                  <input type="number" formControlName="price" class="form-control smoky" id="productPrice" placeholder="Enter product price">
                </div>

                <div class="mb-3">
                  <label for="productQuantity" class="form-label">
                    <i class="fas fa-cubes"></i> Quantity
                  </label>
                  <input type="number" formControlName="quantity" class="form-control smoky" id="productQuantity" placeholder="Enter product quantity">
                </div>

                <div class="mb-3">
                  <label for="productCategory" class="form-label">
                    <i class="fas fa-list"></i> Category
                  </label>
                  <select class="form-select smoky" id="productCategory" formControlName="category">
                    <option value="">Select a category</option>
                    @for (category of categories; track category.id) {
                      <option [value]="category.id">{{category.name}}</option>
                    }
                  </select>
                </div>

                <div class="mb-3">
                  <label for="productImage" class="form-label">
                    <i class="fas fa-camera"></i> Product Image
                  </label>
                  <input class="form-control smoky" type="file" id="productImage" (change)="onFileChange($event)">
                </div>

                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-plus"></i> Add Product
                </button>
              </form>
            </div>
          </div>

          <!-- My Products Section -->
          <div class="card">
            <div class="card-header" style="background-color: darkgray;">
              <h3><i class="fas fa-boxes"></i> My Products</h3>
            </div>
            <div class="card-body" style="background-color: lightgray;">
              <div class="row">
                @if(userProducts.length === 0){
                  <p class="text-center">you have no products published yet! ..... </p>
                }
                <!-- List of products -->
                @for (product of userProducts; track product.id) {
                  <div class="col-md-4 mb-4">
                    <div class="card h-100">
                      <img [src]="'http://localhost:8080/images/' + product.imageUrl" class="card-img-top image-resize" alt="Product 1">
                      <div class="card-body text-center">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text"><i class="fas fa-dollar-sign"></i> Price: $<span class="fw-bold fs-4">{{product.price}}</span></p>
                        <button class="btn btn-info">
                          <i class="fas fa-eye"></i> View Status
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }

      @if(currentView === 'payment'){
        <div>
          <h2>saved payment methods</h2>
          <p>payment methods used by you and different cards.</p>
          <!-- saved payment methods -->
        </div>
      }
    
    </div>
    }
  </div>
</div>




  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
  showModal: boolean = false;
  selectedFile!: any;
  loading: boolean = false;
  currentView: string = 'overview';
  userDetails!: UserDTO | null;
  isLoggedIn: boolean = false;
  categories: CategoryDTO[] = [];
  userProducts: ProductDTO[] = [];
  newProduct: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private http: HttpClient, private productService: ProductService) {
    this.isLoggedIn = authService.isLoggedIn();
    if (this.isLoggedIn){
      this.fetchUserDetails();
      this.getAllCategories();
      this.getUserProducts();
    }
    else {
      this.router.navigate(['/home']);
    }
  }


  fetchUserDetails() {
    this.userService.getUser()?.subscribe(
      (userDTO: UserDTO) => {
        this.userDetails = userDTO; // Assign the response to `userDetails`
        console.log(userDTO);
        
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  getAllCategories(){
    return this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getUserProducts(){
    return this.productService.getAllUserProducts().subscribe((data) => {
      this.userProducts = data;
    });
  }


  setView(view: string) {
    this.currentView = view;
  }

  goHome() {
    this.router.navigate(['/home']);
  }


  onImageSelected(event: any) {
    this.loading = true;
    const file = event.target.files[0];

    console.log(file);

    const form = new FormData();
    form.append('file', file);

    let userId: string | null = '';
    if (this.userDetails) {
      userId = this.userDetails.id;
      form.append('userId', userId!);
    }
    

    // send to server REST API
    this.http.post('http://localhost:8080/files/user/upload', form, { responseType: 'text' }).subscribe(
      (fileName: string) => {
        console.log(fileName);
        setTimeout(() => { // mimic slow network loading time(REMOVE THIS TIMEOUT IN PRODUCTION!)
          this.userDetails!.userImage = fileName;
          this.loading = false; // End loading after delay
        }, 1500);

      }, 
      error => {
        console.log('file loading error');
        this.loading = false;
      }
    );
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  handleNewProductSubmition() {
    const name = this.newProduct.get('name')?.value;
    const description = this.newProduct.get('description')?.value;
    const price = this.newProduct.get('price')?.value;
    const quantity = this.newProduct.get('quantity')?.value;
    const category = this.newProduct.get('category')?.value;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('userId', this.userService.getUserId());
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.productService.addProduct(formData).subscribe(
      (response: string) => {
        console.log(response);
        this.showModal = true; // Show modal after success
        this.newProduct.reset();
        this.getUserProducts();
      }
    )
  }

  closeModal() {
    this.showModal = false;
  }

}
