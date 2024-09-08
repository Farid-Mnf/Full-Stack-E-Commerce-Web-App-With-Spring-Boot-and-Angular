import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarContent">
              <form class="d-flex mx-auto">
                  <input class="form-control me-2" type="search" placeholder="Search for products">
                  <button class="btn btn-outline-success px-4 text-light" type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
              </form>
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <a class="nav-link text-light" href="#">
                      <i class="fa-solid fa-cart-shopping"></i>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link text-light" href="#"><i class="fa-solid fa-user"></i></a>  
                  </li>
                  <li class="nav-item">
                      <a class="nav-link text-light" [routerLink]="['/login']">Login</a>
                  </li>
              </ul>
          </div>
      </div>
    </nav>

  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
