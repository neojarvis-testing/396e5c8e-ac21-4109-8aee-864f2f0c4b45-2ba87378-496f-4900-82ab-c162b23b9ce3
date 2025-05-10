import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-seller-view-requests',
  templateUrl: './seller-view-requests.component.html',
  styleUrls: ['./seller-view-requests.component.css']
})
export class SellerViewRequestsComponent implements OnInit {

  requests: any[] = [];
  filteredRequests: any[] = [];
  selectedStatus: string = 'All';
  selectedRequest: any = null;
  searchText: string = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getAllRequests().subscribe((data: any[]) => {
      this.requests = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredRequests = this.selectedStatus === 'All'
      ? this.requests
      : this.requests.filter(r => r.status === this.selectedStatus);
  }

  openModal(request: any): void {
    this.selectedRequest = request;
    const modal = document.getElementById('detailsModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('detailsModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
    }
  }

  updateStatus(requestId: string, status: string): void {
    this.requestService.updateRequest(requestId, { status }).subscribe(() => {
      this.loadRequests();
    });
  }

}