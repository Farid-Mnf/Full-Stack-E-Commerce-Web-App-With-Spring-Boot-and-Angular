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
  <h1>User Details</h1>



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
  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
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

}
