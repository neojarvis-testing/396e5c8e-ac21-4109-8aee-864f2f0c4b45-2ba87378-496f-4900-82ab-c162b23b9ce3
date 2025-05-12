import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-navbar',
  templateUrl: './farmer-navbar.component.html',
  styleUrls: ['./farmer-navbar.component.css']
})
export class FarmerNavbarComponent implements OnInit {

  user:any=null;
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  navigate(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      this.router.navigate([`/farmer/${value}`]);
    }
  }
}