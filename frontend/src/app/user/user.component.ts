import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  template: `
    <p>
      user works!
    </p>
    <h1>Current User: {{ name }} </h1>
  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
  name = 'farid faisal';
}
