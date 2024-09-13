import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDTO } from '../model/UserDTO';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  template: `
<!-- @if(!isLoggedIn){
  {{ goHome() }}
} -->
<div class="container-fluid">
  <div class="row">
    
    <!-- Left Side Panel -->
    <div class="col-md-3 bg-light" style="min-height: 100vh;">
      <ul class="nav flex-column p-3">
        <button class="btn btn-dark mb-4 w-50" (click)="goHome()"><i class="fa-solid fa-house"></i> Home</button>
        <!-- Basic Info -->
        <li class="nav-item">
          <a class="nav-link active" [class]="{'active': currentView === 'overview'}" (click)="setView('overview')"><i class="fas fa-user-circle"></i> Basic Info</a>
        </li>
        <!-- Settings -->
        <li class="nav-item">
          <a class="nav-link" [class]="{'active': currentView === 'settings'}" (click)="setView('settings')"><i class="fas fa-cog"></i> Account Settings</a>
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
      </ul>
    </div>
    @if(isLoggedIn && userDetails){
    <!-- Right Side Content -->
    <div class="col-md-9 p-4">
      @if(currentView === 'overview'){
        <div class="container mt-4">
          <div class="justify-content-center">
            <!-- Profile Image and Upload Button -->
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
              <div class="card-header">
                <h3>Basic Information</h3>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item fs-4">
                    <strong>Name:</strong> {{ userDetails.name }}
                  </li>
                  <li class="list-group-item fs-4">
                    <strong>Email:</strong> {{ userDetails.email }}
                  </li>
                  <li class="list-group-item fs-4">
                    <strong>Phone:</strong> {{ userDetails.phone }}
                  </li>
                  <li class="list-group-item fs-4">
                    <strong>Country:</strong> {{ userDetails.addressDTO.country }}
                  </li>
                  <li class="list-group-item fs-4">
                    <strong>City:</strong> {{ userDetails.addressDTO.city }}
                  </li>
                  <li class="list-group-item fs-4">
                    <strong>Street Name:</strong> {{ userDetails.addressDTO.streetName }}
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
        <div>
          <h2>Sell Items</h2>
          <p>Manage your listed items for sale.</p>
          <!-- Sell Items Content -->
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
  currentView: string = 'overview';
  userDetails!: UserDTO | null;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private http: HttpClient) {
    this.isLoggedIn = authService.isLoggedIn();
    if (this.isLoggedIn){
      this.fetchUserDetails();
      console.log('image: ', this.userDetails?.userImage);
      
    }
    else {
      this.router.navigate(['/home']);
    }
  }

  fetchUserDetails() {
    this.userService.getUser()?.subscribe(
      (userDTO: UserDTO) => {
        this.userDetails = userDTO; // Assign the response to `userDetails`
        console.log(this.userDetails);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }


  setView(view: string) {
    this.currentView = view;
  }

  goHome() {
    this.router.navigate(['/home']);
  }


  onImageSelected(event: any) {
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
        this.userDetails!.userImage = fileName;
      }, 
      error => {
        console.log('file loading error')
      }
    );

  }



}
