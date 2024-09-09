import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDTO } from '../model/UserDTO';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  template: `
  @if (userDetails) {
    <h1>Name: {{ userDetails.name }} </h1>
    <h1>Email: {{ userDetails.email }} </h1>
    <h1>Phone: {{ userDetails.phone }} </h1>
    <h1>Street Name: {{ userDetails.addressDTO.streetName }} </h1>
    <h1>City: {{ userDetails.addressDTO.city }} </h1>
    <h1>Country: {{ userDetails.addressDTO.country }} </h1>
  }
  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
  jwt: string | null;
  user = {};
  userDetails!: UserDTO;
  constructor(private authService: AuthService, private userService: UserService){
    this.jwt = authService.getToken();
    const userId = authService.getUserDetails().userId;
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.userService.getUser().subscribe(
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
