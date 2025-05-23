import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth1Guard implements CanActivate {

  constructor(private readonly router:Router){

  }

  canActivate(): boolean {
    const user  = JSON.parse(localStorage.getItem('user')); 
    console.log(user);
    if (user?.token) { // Check if token exists
      if(user?.role === 'seller')
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
