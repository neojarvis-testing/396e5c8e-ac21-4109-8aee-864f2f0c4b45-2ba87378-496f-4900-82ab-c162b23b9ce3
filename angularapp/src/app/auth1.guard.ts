import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth1Guard implements CanActivate {

  constructor(private router:Router){

  }

  canActivate(): boolean {
    const user  = JSON.parse(localStorage.getItem('user')); 
    console.log(user);
    if (user?.token) { // Check if token exists
      if(user?.role === 'seller')
      return true; // Allow navigation
      else
      return false;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
  
}
