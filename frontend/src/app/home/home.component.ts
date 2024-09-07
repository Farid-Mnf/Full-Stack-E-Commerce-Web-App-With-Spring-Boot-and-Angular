import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CategoriesComponent } from "../categories/categories.component";
import { FeaturedProductsComponent } from "../featured-products/featured-products.component";
import { ProductRecommendationsComponent } from "../product-recommendations/product-recommendations.component";
import { FooterComponent } from "../footer/footer.component";



@Component({
  selector: 'home',
  standalone: true,
  imports: [HeaderComponent, CategoriesComponent, FeaturedProductsComponent, ProductRecommendationsComponent, FooterComponent],
  template: `
  <my-header></my-header>
  <categories></categories>
  <featured-products></featured-products>
  <product-recommendations></product-recommendations>
  <app-footer></app-footer>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jwtToken: string | null = localStorage.getItem('jwtToken');
  

  
}
