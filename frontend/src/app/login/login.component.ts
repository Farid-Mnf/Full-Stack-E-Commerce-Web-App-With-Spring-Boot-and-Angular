import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginRequestDTO } from '../model/LoginRequestDTO';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  template: `
<div class="background">
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-5 login-card">
      <h3 class="text-center mb-4">Login</h3>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" formControlName="email" placeholder="Enter your email">
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="text-danger">
            Please enter a valid email.
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" formControlName="password" placeholder="Enter your password">
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="text-danger">
            Password must be at least 6 characters long.
          </div>
          <div *ngIf="error" class="text-danger">
            Wrong email or password.
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid">Login</button>
        <a [routerLink]="['/register']" class="m-4">Create new account?</a>
      </form>
    </div>
  </div>
</div>
`,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  error = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest = new LoginRequestDTO(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      this.authService.login(loginRequest).subscribe(
        (response) => {
          this.error = false;
          const jwt = response.body.jwtToken.split(' ')[1];
          this.authService.saveToken(jwt);
          console.log('saved token: ' + jwt);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
          this.error = true;
        }
      );
    }
  }

}
