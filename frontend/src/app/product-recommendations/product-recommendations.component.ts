import { Component } from '@angular/core';

@Component({
  selector: 'product-recommendations',
  standalone: true,
  imports: [],
  template: `
    <!-- Product Recommendations Section -->
    <div class="container my-5">
        <h2 class="text-center mb-4">Trending Products</h2>
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <img src="https://via.placeholder.com/200x150?text=Trending+1" class="card-img-top product-img" alt="Trending Product 1">
                    <div class="card-body">
                        <h5 class="card-title">Trending Product 1</h5>
                        <p class="card-text">$150.00</p>
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <img src="https://via.placeholder.com/200x150?text=Trending+2" class="card-img-top product-img" alt="Trending Product 2">
                    <div class="card-body">
                        <h5 class="card-title">Trending Product 2</h5>
                        <p class="card-text">$250.00</p>
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <img src="https://via.placeholder.com/200x150?text=Trending+3" class="card-img-top product-img" alt="Trending Product 3">
                    <div class="card-body">
                        <h5 class="card-title">Trending Product 3</h5>
                        <p class="card-text">$350.00</p>
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <img src="https://via.placeholder.com/200x150?text=Trending+4" class="card-img-top product-img" alt="Trending Product 4">
                    <div class="card-body">
                        <h5 class="card-title">Trending Product 4</h5>
                        <p class="card-text">$450.00</p>
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

  `,
  styleUrl: './product-recommendations.component.css'
})
export class ProductRecommendationsComponent {

}
