import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-farmer-my-requests',
  templateUrl: './farmer-my-requests.component.html',
  styleUrls: ['./farmer-my-requests.component.css']
})
export class FarmerMyRequestsComponent implements OnInit {

  requests: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.requestService.getAllRequests().subscribe(
      (data) => {
        this.requests = data;
      },
      (error) => {
        console.error('Error fetching requests', error);
      }
    );
  }


}