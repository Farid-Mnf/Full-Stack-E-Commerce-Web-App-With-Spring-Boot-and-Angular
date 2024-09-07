import { Component } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  template: `
    <p>
      home works!
    </p>
    <h1> Jwt token: {{ jwtToken }}
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jwtToken: string | null = localStorage.getItem('jwtToken');
  
  
}
