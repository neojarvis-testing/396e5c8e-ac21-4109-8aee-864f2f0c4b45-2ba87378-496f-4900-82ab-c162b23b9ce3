import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authguard',
  templateUrl: './authguard.component.html',
  styleUrls: ['./authguard.component.css']
})
export class AuthguardComponent implements CanActivate {

  constructor(private router:Router) { }

  canActivate(): boolean  {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
