import { Component } from '@angular/core';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [],
  template: `
    <!-- Categories Section -->
    <div class="container my-5">
        <h2 class="text-center mb-4">Shop by Categories</h2>
        <div class="row">
            <div class="col-md-4">
                <div class="card category-card">
                    <img src="https://via.placeholder.com/300x150?text=Electronics" class="card-img-top" alt="Electronics">
                    <div class="card-body">
                        <h5 class="card-title">Electronics</h5>
                        <p class="card-text">Shop the latest electronic devices and gadgets.</p>
                        <a href="#" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card category-card">
                    <img src="https://via.placeholder.com/300x150?text=Fashion" class="card-img-top" alt="Fashion">
                    <div class="card-body">
                        <h5 class="card-title">Fashion</h5>
                        <p class="card-text">Discover the latest trends in fashion.</p>
                        <a href="#" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card category-card">
                    <img src="https://via.placeholder.com/300x150?text=Home+Appliances" class="card-img-top" alt="Home Appliances">
                    <div class="card-body">
                        <h5 class="card-title">Home Appliances</h5>
                        <p class="card-text">Upgrade your home with new appliances.</p>
                        <a href="#" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

  `,
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
