import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-farmer-my-requests',
  templateUrl: './farmer-my-requests.component.html',
  styleUrls: ['./farmer-my-requests.component.css']
})
export class FarmerMyRequestsComponent implements OnInit {

  requests: any[] = [];
  selectedRequest: any;
  requestToDeleteId: string | null = null;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    const userId = localStorage.getItem('userId') || '';
    this.requestService.getRequestsByUserId(userId).subscribe(response => {
      this.requests = response.data;
      this.totalPages = response.totalPages;
    });
  }

  viewRequest(requestId: string): void {
    this.requestService.getRequestsByUserId(requestId).subscribe(request => {
      this.selectedRequest = request;
    });
  }

  confirmDelete(requestId: string): void {
    this.requestToDeleteId = requestId;
  }

  deleteRequest(): void {
    if (this.requestToDeleteId) {
      this.requestService.deleteRequest(this.requestToDeleteId).subscribe(() => {
        this.loadRequests();
      });
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadRequests();
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}