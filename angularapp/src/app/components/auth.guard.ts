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
    const user  = JSON.parse(localStorage.getItem('user')); 
    if (user?.token) { // Check if token exists
      if(user?.role === 'farmer')
      return true; // Allow navigation
      else{
        this.router.navigate(['/home-page'])
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
  
}