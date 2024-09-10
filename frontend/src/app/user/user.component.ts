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
        <li class="nav-item">
          <a class="nav-link active" [class]="{'active': currentView === 'overview'}" (click)="setView('overview')">Overview</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [class]="{'active': currentView === 'orders'}" (click)="setView('orders')">My Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [class]="{'active': currentView === 'settings'}" (click)="setView('settings')">Account Settings</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"  [class]="{'active': currentView === 'sell'}" (click)="setView('sell')">Sell Items</a>
        </li>
      </ul>
    </div>

    <!-- Right Side Content -->
    <div class="col-md-9 p-4">
      @if(currentView === 'overview'){
        <div>
        <h2>Overview</h2>
        <p>Welcome to your profile! Here you can see your general information.</p>
          
          @if (isLoggedIn && userDetails) {
            <h1>Name: {{ userDetails.name }} </h1>
            <h1>Email: {{ userDetails.email }} </h1>
            <h1>Phone: {{ userDetails.phone }} </h1>
            <h1>Street Name: {{ userDetails.addressDTO.streetName }} </h1>
            <h1>City: {{ userDetails.addressDTO.city }} </h1>
            <h1>Country: {{ userDetails.addressDTO.country }} </h1>
          }
          @if(!isLoggedIn){
            goHome();
          }
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
  constructor(private router: Router, private authService: AuthService, private userService: UserService){
    this.isLoggedIn = authService.isLoggedIn();
    if(this.isLoggedIn)
      this.fetchUserDetails();
    else{
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

  goHome(){
    this.router.navigate(['/home']);
  }


}
