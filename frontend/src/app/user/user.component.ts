import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDTO } from '../model/UserDTO';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  template: `

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

    <!-- Right Side Content -->
    <div class="col-md-9 p-4">
      @if(currentView === 'overview'){
        <div class="container mt-4">
          <div class="justify-content-center">
            <!-- Profile Image and Upload Button -->
            <div class="text-center">
              <div class="mb-4">
                <img [src]="profileImageUrl || '/assets/user_image.jpg'" class="rounded-circle img-fluid" alt="Profile Image" style="width: 150px; height: 150px; object-fit: cover;">
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
                @if(isLoggedIn && userDetails){
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
                }
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- <div>
        <h2>Basic Information</h2>
          
          @if (isLoggedIn && userDetails) {
            {{ userDetails.name }} 
            {{ userDetails.email }} 
            {{ userDetails.phone }} 
            {{ userDetails.addressDTO.streetName }} 
            {{ userDetails.addressDTO.city }} 
            {{ userDetails.addressDTO.country }} 
          }
          @if(!isLoggedIn){
            goHome();
          }
        </div> -->
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
  </div>
</div>




  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
  currentView: string = 'overview';
  userDetails!: UserDTO | null;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.isLoggedIn = authService.isLoggedIn();
    if (this.isLoggedIn)
      this.fetchUserDetails();
    else {
      console.log('redirected to home');
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

  profileImageUrl: string | ArrayBuffer | null | undefined= null;

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }



}
