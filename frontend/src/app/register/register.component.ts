import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserDTO } from '../model/UserDTO';
import { AddressDTO } from '../model/AddressDTO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <div class="container-sm mt-5">
    <div class="row">
      <div class="col-md-6">
        <h2 class="mb-4 text-center">Register</h2>
        <form [formGroup]="register" (submit)="handleFormSubmition()">
          <label for="username" class="form-label">Name:</label>
          <input id="username" formControlName="name" type="text" class="form-control mb-3" placeholder="Enter your name">
        
          <label for="email" class="form-label">Email:</label>
          <input id="email" formControlName="email" type="email" class="form-control mb-3" placeholder="Enter your email">
          
          <label for="password" class="form-label">Password:</label>
          <input id="password" formControlName="password" type="password" class="form-control mb-3" placeholder="Enter your password">
        
          <label for="phone" class="form-label">Phone:</label>
          <input id="phone" formControlName="phone" type="text" class="form-control mb-3" placeholder="Enter your phone number"> 
          <label for="countries" class="form-label">Choose your country:</label>
          <select id="countries" formControlName="country" class="form-select mb-3">
            <option value="Egypt" selected>Egypt</option>
            @for(country of countries; track $index){
              <option [value]="country">{{ country }}</option>
            }
          </select>


          <div class="row">
              <div class="col-md-6">
                  <div class="box bg-light">       
                    <label for="city" class="form-label">City:</label>
                    <input id="city" formControlName="city" type="text" class="form-control mb-3" placeholder="Enter your city">
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="box bg-light">
                    <label for="streetName" class="form-label">Street name:</label>
                    <input id="streetName" formControlName="streetName" type="text" class="form-control mb-3" placeholder="Enter your street name">
                  </div>
              </div>
          </div>
        
          <button type="submit" class="btn btn-primary mt-3">Register</button>
        </form>
      </div>

    <!-- Right Side (Image) -->
      <div class="col-md-6 image-column">
      </div>
    </div>
  </div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  apiURL = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private router: Router) { }
  handleFormSubmition() {
    const addressDTO: AddressDTO = new AddressDTO(this.register.value.city ?? '', this.register.value.country ?? '', this.register.value.streetName ?? '');
    const userDTO: UserDTO = new UserDTO(this.register.value.name ?? '', this.register.value.email ?? '', this.register.value.phone ?? '', this.register.value.password ?? '', addressDTO);

    this.http.post<UserDTO>(this.apiURL, userDTO, { observe: 'response'}).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200 || response.status === 201) {
        this.router.navigate(['/login']);
      }
    });

  }

  register = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    streetName: new FormControl('')
  })

  countries: string[] = ['United States', 'Canada', 'Mexico', 'Germany', 'France', 'United Kingdom', 'India', 'China', 'Japan',
    'Saudi Arabia'];


}
