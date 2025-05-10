import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){

  }

  canActivate(): boolean {
    const token = JSON.parse(localStorage.getItem('user'))?.token; // Check if token exists
    if (token) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
  
}