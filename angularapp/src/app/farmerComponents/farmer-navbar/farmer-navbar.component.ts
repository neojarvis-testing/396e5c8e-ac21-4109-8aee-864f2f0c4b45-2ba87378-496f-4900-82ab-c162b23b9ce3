import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-navbar',
  templateUrl: './farmer-navbar.component.html',
  styleUrls: ['./farmer-navbar.component.css']
})
export class FarmerNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {

    this.router.navigate(['/login']);
  }
}