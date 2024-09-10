import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserDTO } from '../model/UserDTO';
import { AuthService } from '../service/auth.service';
@Component({
    selector: 'my-header',
    standalone: true,
    imports: [RouterLink],
    template: `
    <!-- Header -->
    <nav class="navbar navbar-expand-lg bg-dark fixed-top">
      <div class="container-fluid">
          <a class="navbar-brand text-light" href="#">eShop <i class="fa-solid fa-store"></i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
              <span class="navbar-toggler-icon" style="background-image: none;padding-top:7px; color:white"><i class="fa-solid fa-bars"></i></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarContent">
              <form class="d-flex mx-auto">
                  <input class="form-control me-2" type="search" placeholder="Search for products">
                  <button class="btn btn-outline-success px-4 text-light" type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
              </form>
              <ul class="navbar-nav ms-auto">


                  @if (!isLoggedIn) {
                        <li class="nav-item">
                            <a class="nav-link text-light" [routerLink]="['/login']">Login <i class="fas fa-sign-in"></i></a>
                        </li>
                  }
                  @if (isLoggedIn){
                        <li class="nav-item">
                        <a class="nav-link text-light" href="#">
                        <i class="fa-solid fa-cart-shopping"></i>
                        </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" [routerLink]="['/profile']"><i class="fa-solid fa-user"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#" (click)="logoutUser()"> Logout <i class="fa-solid fa-sign-out"></i></a>
                        </li>
                  }
              </ul>
          </div>
      </div>
    </nav>

  `,
    styleUrl: './header.component.css'
})
export class HeaderComponent {

    userDetails!: UserDTO | null;
    isLoggedIn: boolean = false;
    constructor(private authService: AuthService, private userService: UserService){
        this.isLoggedIn = authService.isLoggedIn();
        if(this.isLoggedIn)
            this.fetchUserDetails();
    }

    fetchUserDetails() {
        this.userService.getUser()?.subscribe(
            (userDTO: UserDTO) => {
                this.userDetails = userDTO; // Assign the response to `userDetails`
                console.log(this.userDetails);
            },
            (error) => {
                console.error('Error fetching user details:', error);
                this.userDetails = null;
            }
            );
    }

    logoutUser() {
        this.authService.logout();
    }

}
