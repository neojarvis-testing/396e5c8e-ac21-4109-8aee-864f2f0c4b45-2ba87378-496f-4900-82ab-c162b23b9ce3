import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get errors() {
    return {
      email: this.loginForm.get('email'),
      password: this.loginForm.get('password')
    };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((user) => {
        const role = user.role;
        localStorage.setItem('user',JSON.stringify(user));
        if (user.token) {
          localStorage.setItem('authToken', user.token); // Store token securely
        }    
        if(role === 'farmer') {
          this.router.navigate(['/farmer/home-page'])
        } else {
          this.router.navigate(['/seller/home-page'])
        }
      })
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}