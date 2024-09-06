import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <div class="container-sm mt-5">
    <h2 class="mb-4 text-center">Register</h2>
    <form [formGroup]="register" (submit)="handleFormSubmition()">
      <label for="username" class="form-label">Name:</label>
      <input id="username" formControlName="username" type="text" class="form-control mb-3" placeholder="Enter your name">
    
      <label for="email" class="form-label">Email:</label>
      <input id="email" formControlName="email" type="email" class="form-control mb-3" placeholder="Enter your email">
      
      <label for="password" class="form-label">Password:</label>
      <input id="password" formControlName="password" type="password" class="form-control mb-3" placeholder="Enter your password">
    
      <label for="phone" class="form-label">Phone:</label>
      <input id="phone" formControlName="phone" type="text" class="form-control mb-3" placeholder="Enter your phone number"> 
      <label for="countries" class="form-label">Choose a country:</label>
      <select id="countries" formControlName="country" class="form-select mb-3" (click)="onCountryChange($event)">
        <option value="Egypt" selected>Egypt</option>
        @for(country of countries; track $index){
          <option [value]="country">{{ country }}</option>
        }
      </select>

      <label for="city" class="form-label">City:</label>
      <input id="city" formControlName="city" type="text" class="form-control mb-3" placeholder="Enter your city">
    
      <label for="streetName" class="form-label">Street name:</label>
      <input id="streetName" formControlName="streetName" type="text" class="form-control mb-3" placeholder="Enter your street name">
 

      <button type="submit" class="btn btn-primary mt-3">Register</button>
    </form>
  </div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  handleFormSubmition() {
    userService.registerUser(
      this.register.value.username,
      this.register.value.email,
      this.register.value.password,
      this.register.value.phone,
      this.register.value.country,
      this.register.value.city,
      this.register.value.streetName);
      
  }
    
  register = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    streetName: new FormControl('')
  })
  


  selectedCountry: string = '';
  countries: string[] = ['United States', 'Canada', 'Mexico', 'Germany', 'France', 'United Kingdom', 'India', 'China', 'Japan', 'Saudi Arabia'];
  
  onCountryChange(event: any) {
    this.selectedCountry = event.target.value;
  }
}
