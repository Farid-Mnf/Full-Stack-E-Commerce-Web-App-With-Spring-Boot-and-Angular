import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CategoriesComponent } from "../categories/categories.component";
import { FeaturedProductsComponent } from "../featured-products/featured-products.component";
import { ProductRecommendationsComponent } from "../product-recommendations/product-recommendations.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HeaderComponent, CategoriesComponent, FeaturedProductsComponent, ProductRecommendationsComponent, FooterComponent],
  template: `
  <section class="home-page">
    <my-header></my-header>
    <categories></categories>
    <featured-products></featured-products>
    <product-recommendations></product-recommendations>
    <app-footer></app-footer>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService){
    this.jwtToken = authService.getToken();    
  }
  jwtToken: string | null = '';
  

  
}
